import React, { Component } from 'react';
import _ from 'lodash';

export default class TopBar extends Component{
  handleStreamChange(e) {
    var streamSelected = React.findDOMNode(this.refs.streamSelect).value.trim();

    e.preventDefault();

    if (!streamSelected || this.props.streamList.indexOf(streamSelected) == -1){
      return
    }

    this.props.onStreamChange(streamSelected);
  }

  render() {
    var options = this.props.streamList
      .map(stream => <option value={stream} >{stream}</option>);

    return (
      <div className='row large-12 topBar columns'>
        <h2 className='large-2 columns'> #{this.props.stream} </h2>
        <select className="large-10 columns" defaultValue={this.props.stream} ref="streamSelect" onChange={this.handleStreamChange}>
          {options}
        </select>
        <hr/>
      </div>
    );
  }
}
