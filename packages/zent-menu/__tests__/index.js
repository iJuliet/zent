import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';
import Menu, { MenuItem, SubMenu } from '../src';

function simulateClickOnSubMenu() {
  const fakeEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  document.querySelector('.zent-sub-menu-overlay .zent-menu-item').dispatchEvent(fakeEvent);
}

describe('Menu component', () => {
  it('can have className', () => {
    let wrapper = mount(
      <Menu className="hello">
        {null}
        <MenuItem key="1-1" className="food">食品分类</MenuItem>
      </Menu>
    );

    expect(wrapper.find('.hello').length).toBe(1);
    expect(wrapper.find('.food').length).toBe(1);
  });

  it('can have prefix', () => {
    let wrapper = mount(
      <Menu prefix="hello">
        <MenuItem key="1-1" prefix="food">食品分类</MenuItem>
      </Menu>
    );

    expect(wrapper.find('.hello-menu').length).toBe(1);
    expect(wrapper.find('.food-menu-item').length).toBe(1);
  });

  it('can have onClick handler', () => {
    const onClick = jest.fn();
    let wrapper = mount(
      <Menu prefix="hello" onClick={onClick}>
        <MenuItem key="1-1" prefix="food">食品分类</MenuItem>
      </Menu>
    );
    wrapper.find('MenuItem').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('can have submenu', () => {
    const onClick = jest.fn();
    let wrapper = mount(
      <Menu prefix="hello" onClick={onClick}>
        <MenuItem key="1-1" prefix="food">食品分类</MenuItem>
        <SubMenu title="美妆分类" className="submenu">
          {null}
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
      </Menu>
    );

    expect(wrapper.find('Popover').length).toBe(1);
    wrapper.find('.zent-sub-menu-trigger').simulate('mouseenter');
    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-sub-menu-overlay').length).toBe(1);

    simulateClickOnSubMenu();
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('can have disabled menu items', () => {
    const onClick = jest.fn();
    let wrapper = mount(
      <Menu onClick={onClick}>
        <MenuItem key="1-1" disabled>食品分类</MenuItem>
        <SubMenu title="美妆分类" disabled>
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
      </Menu>
    );

    expect(wrapper.find('.zent-menu-item-disabled').length).toBe(2);

    wrapper.find('MenuItem').at(0).simulate('click');
    expect(onClick.mock.calls.length).toBe(0);

    simulateClickOnSubMenu();
    expect(onClick.mock.calls.length).toBe(0);
  });
});

