import React from 'react';

var TopBar = React.createClass({
  handleSubmit: function () {
    var streamSelected = "default";

    this.props.onStreamSelect(streamSelected);
  },
  render: function () {
    var options = this.props.streamList.map(function (stream) {
      return (
        <option value={stream}>{stream}</option>
      );
    });

    return (
      <div className='row topBar'>
        <h2 className='large-6 columns'> #{this.props.stream} </h2>
        <form className="large-6 columns" onSubmit={this.handleSubmit}>
          <select ref="streamSelect">
            {options}
          </select>
        </form>
        <hr/>
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func
  }
});

export default TopBar;
