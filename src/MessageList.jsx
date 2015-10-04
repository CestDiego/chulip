import React from 'react';
import Message from './Message.jsx'

var MessageList = React.createClass({
  render: function () {
    /* var messageNodes = this.props.data.map(function (comment) { */
    // Firebase gives Objects instead of arrays
    var data = this.props.data
    var messageNodes = Object.keys(this.props.data).map(function (index, value, obj) {
      var comment = data[index]
      return (
        <Message authorId={comment.authorId}>
          {comment.text}
        </Message>
      );
    });
    return (
      <div className='commentList'>
        {messageNodes}
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func
  }
});

export default MessageList;
