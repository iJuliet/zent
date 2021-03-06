import React, { Component } from 'react';
import classNames from 'zent-utils/classnames';
import PanelCell from '../common/PanelCell';
import { CURRENT_MONTH } from '../utils/';

const ROW = 4;
const COL = 3;

export default class MonthPanelBody extends Component {
  isSelected(val) {
    return val === this.props.actived.getMonth();
  }
  getMonths() {
    let months = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      months[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const isCurrent = index === CURRENT_MONTH;
        const isSelected = this.isSelected(index);
        const className = classNames({
          'panel__cell month-panel__cell': true,
          'panel__cell--current': isCurrent,
          'panel__cell--selected': isSelected
        });
        months[rowIndex][colIndex] = {
          text: `${index + 1}月`,
          value: index,
          className
        };
        index++;
      }
    }
    return months;
  }

  render() {
    let months = this.getMonths();
    return (
      <table className="month-table panel__table">
        <PanelCell onSelect={this.props.onSelect} cells={months} />
      </table>
    );
  }
}
