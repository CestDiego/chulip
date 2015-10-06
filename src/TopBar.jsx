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

      var isSelected = (stream === this.props.stream) ? true : false;
      return (
        <option selected={isSelected}  value={stream} >{stream}</option>
      );
    }.bind(this));

    return (
      <div className='row large-12 topBar columns'>
        <h2 className='large-2 columns'> #{this.props.stream} </h2>
        <select className="large-10 columns" ref="streamSelect" onChange={this.handleStreamChange}>
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
