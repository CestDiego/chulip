import React from 'react';
import Message from './Message.jsx';
import firebaseUtils from './firebaseUtils.js';

var MessageList = React.createClass({
  render: function () {
    // Firebase gives Objects instead of arrays
    var data = this.props.messages
    var messageNodes = Object.keys(data).map(function (index, value, obj) {
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
