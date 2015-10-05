import React from 'react';
import firebaseUtils from './firebaseUtils';

var TopBar = React.createClass({
  handleSubmit: function () {
    var streamSelected = "default";
    this.props.onStreamSelect(streamSelected);
  },
  getInitialState: function () {
    return {
      stream: this.props.data.stream
    }
  },
  render: function () {
    return (
      <div className='topBar'>
        <h2 className='currentStream'> #{this.state.stream} </h2>
        <form className="ChannelForm" onSubmit={this.handleSubmit}>
        </form>
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func,
  }
});

export default TopBar;
