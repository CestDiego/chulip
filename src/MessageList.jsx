import React from 'react';
import Message from './Message.jsx';
import firebaseUtils from './firebaseUtils.js';

var MessageList = React.createClass({
  componentWillMount: function () {
    var stream = this.props.data.stream;
    var streamRef = firebaseUtils.ref.child('messages').child(stream);
    streamRef.on('value', function (messagesRef) {
      this.setState({
        messages: messagesRef.val()
      });
    }.bind(this));
  },
  getInitialState: function () {
    return {
      messages: []
    }
  },
  render: function () {
    /* var messageNodes = this.props.data.map(function (comment) { */
    // Firebase gives Objects instead of arrays
    var data = this.state.messages
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
