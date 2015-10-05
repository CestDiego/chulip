import React from 'react';

import _ from 'lodash';

var TopBar = React.createClass({
  handleStreamChange: function (e) {
    var streamSelected = React.findDOMNode(this.refs.streamSelect).value.trim();

    e.preventDefault();

    if (!streamSelected || this.props.streamList.indexOf(streamSelected) == -1){
      return
    }

    this.props.onStreamChange(streamSelected);
  },
  render: function () {
    var options = this.props.streamList.map(function (stream) {
      return (
        <option value={stream}>{stream}</option>
      );
    });

    return (
      <div className='row topBar'>
        <h2 className='large-3 columns'> #{this.props.stream} </h2>
        <select className="large-9 columns" ref="streamSelect" onChange={this.handleStreamChange}>
          {options}
        </select>
        <hr/>
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func
  }
});

export default TopBar;
