import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  onChange = (e) => {
    this.props.onSearchInputChanged(e.target.value);
  };

  render() {
    return (
      <input type="text"
              className="form-control search-input"
              placeholder="type to search"
              onChange={this.onChange} />
    );
  };
};