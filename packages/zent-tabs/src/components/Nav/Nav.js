import React from 'react';
import ReactDOM from 'react-dom';
import Tab from '../Tab/Tab';
import navUtil from './navUtil';

function noop() {}

class Nav extends React.Component {
  static propTypes = {
    prefix: React.PropTypes.string,
    tabListData: React.PropTypes.array,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    align: React.PropTypes.string,
    size: React.PropTypes.string,
    onDelete: React.PropTypes.func,
    onTabAdd: React.PropTypes.func,
    candel: React.PropTypes.bool,
    canadd: React.PropTypes.bool,
    uniqueId: React.PropTypes.number
  };

  static defaultProps = {
    prefix: 'zent',
    onChange: noop,
    tabListData: [],
    type: 'normal',
    align: 'left',
    size: 'normal',
    onDelete: noop,
    candel: false,
    canadd: false,
    onTabAdd: noop,
    uniqueId: 0
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    // 设置navContent的宽度
    this.positionInkBar();
  }

  positionInkBar() {
    let { type } = this.props;
    if (type === 'slider') {
      let activeTabDom = ReactDOM.findDOMNode(this.activeTab);
      if (activeTabDom) {
        let tWidth = navUtil.getOffsetWH(activeTabDom);
        let tLeft = navUtil.getOffsetLT(activeTabDom);
        let wrapLeft = navUtil.getOffsetLT(this.tabwrapDom);
        this.inkBarDom.style.width = `${tWidth}px`;
        this.inkBarDom.style.left = `${tLeft - wrapLeft}px`;
      }
    }
  }

  renderTabs() {
    let renderData = navUtil.modifyTabListData(this.props);
    let TabList = [];
    renderData.forEach((renderDataItem) => {
      let refParam = {};
      if (renderDataItem.actived) {
        refParam.ref = (c) => {
          this.activeTab = c;
        };
      }
      TabList.push(
        <Tab
          prefix={this.props.prefix}
          onSelected={this.onTabSelected.bind(this)}
          onDelete={this.onTabDel.bind(this)}
          uniqueId={this.props.uniqueId}
          {...renderDataItem}
          id={renderDataItem.key}
          {...refParam}
        >
          {renderDataItem.title}
        </Tab>
      );
    });
    return TabList;
  }

  onTabSelected(id) {
    let { onChange } = this.props;
    // change
    onChange(id);
  }

  onTabDel(id) {
    let { onDelete } = this.props;
    onDelete(id);
  }

  onTabAdd() {
    let { onTabAdd } = this.props;
    onTabAdd();
  }

  render() {
    let { prefix, align, canadd, size, type } = this.props;
    let classes = `${prefix}-tabs-size-${size} ${prefix}-tabs-type-${type} ${prefix}-tabs-align-${align}`;
    let addOperation = '';
    if (canadd && align !== 'center') {
      addOperation = <div className={`${prefix}-tabs-nav-add`} onClick={this.onTabAdd.bind(this)}><span>+</span></div>;
    }

    return (
      <div className={`${prefix}-tabs-nav ${classes}`}>
        <div className={`${prefix}-tabs-nav-content`} ref={(r) => { this.navContentDom = ReactDOM.findDOMNode(r) }}>
          {addOperation}
          <div className={`${prefix}-tabs-scroll`}>
            <div className={`${prefix}-tabs-tabwrap`} role="tablist" ref={(c) => { this.tabwrapDom = c }}>
              <span className={`${prefix}-tabs-nav-ink-bar`} ref={(c) => { this.inkBarDom = c }}></span>
              <div>{this.renderTabs()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
