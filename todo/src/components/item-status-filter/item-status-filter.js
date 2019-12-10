import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  state = {
    statusSelected: 'all'
  };

  onStatusFilterClicked = (status) => {
    this.setState(() => {
      this.props.onFilterButtonClick(status);
      return {
        statusSelected: status
      };
    });
  };
  
  render() {

    const {statusSelected} = this.state;
    let allButtonClassName = 'btn'
    let activeButtonClassName = 'btn';
    let doneButtonClassName = 'btn';

    switch(statusSelected)
    {
      case 'all':
        allButtonClassName += ' btn-info';
        activeButtonClassName += ' btn-outline-secondary';
        doneButtonClassName += ' btn-outline-secondary';
        break;
      case 'active':
        allButtonClassName += ' btn-outline-secondary';
        activeButtonClassName += ' btn-info';
        doneButtonClassName += ' btn-outline-secondary';
        break;
      case 'done':
        allButtonClassName += ' btn-outline-secondary';
        activeButtonClassName += ' btn-outline-secondary';
        doneButtonClassName += ' btn-info';
        break;
      default:
        console.log(`Unable to determine status ${statusSelected}.`)
    }

    return (
      <div className="btn-group">
        <button type="button"
                className={allButtonClassName}
                onClick={() => this.onStatusFilterClicked('all')}>
          All
        </button>
        <button type="button"
                className={activeButtonClassName}
                onClick={() => this.onStatusFilterClicked('active')}>
          Active
        </button>
        <button type="button"
                className={doneButtonClassName}
                onClick={() => this.onStatusFilterClicked('done')}>
          Done
        </button>
      </div>
    );
  }
}