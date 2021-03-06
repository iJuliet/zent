import React, { Component, PropTypes } from 'react';

import Portal from '../src';
import '../assets/context.scss';

/*

**react<=15.2.1的版本有bug，除了initial render外context不会更新**

https://github.com/facebook/react/pull/7125

这个例子使用了[context](https://facebook.github.io/react/docs/context.html)，context
可以正确在Portal中传递。
*/
function exposeStore(BaseComponent) {
  return class ExposeStoreWrapper extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    render() {
      const { store } = this.context;
      return <BaseComponent store={store} />;
    }
  };
}

const Child = exposeStore(class _Child extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    const { count } = store;
    return <div className="child">store: {count}</div>;
  }
});

export default class Parent extends Component {
  state = {
    store: {
      count: 0
    },
    visible: false
  };

  static childContextTypes = {
    store: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      store: this.state.store
    };
  }

  inc = () => {
    const { store } = this.state;
    this.setState({
      store: {
        count: store.count + 1
      }
    });
  };

  dec = () => {
    const { store } = this.state;
    this.setState({
      store: {
        count: store.count - 1
      }
    });
  };

  open = () => {
    this.setState({
      visible: true
    });
  };

  close = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;

    return (
      <div className="parent">
        <Portal className="context-portal" visible={visible}>
          <Child />
        </Portal>
        {!visible && <button onClick={this.open} className="btn-open">open</button>}
        {visible && <button onClick={this.close} className="btn-close">close</button>}
        <button onClick={this.inc} className="btn-inc">+</button>
        <button onClick={this.dec} className="btn-dec">-</button>
      </div>
    );
  }
}
