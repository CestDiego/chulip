import React from 'react';

import firebaseUtils from './firebaseUtils';

var MessageForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    var stream = React.findDOMNode(this.refs.stream).value.trim();
    if (!text || !stream) {
      return;
    }
    console.log(this.props)
    if (firebaseUtils.isLoggedIn()){
      var submitedAt = new Date();
      this.props.onMessageSubmit({
        authorId: this.props.user.id,
        text: text,
        stream: stream,
        submitedAt: submitedAt.toJSON()
      });
    }
    React.findDOMNode(this.refs.text).value = '';
    React.findDOMNode(this.refs.stream).value = '';
    return;
  },
  getInitialState: function () {
    return null;
  },
  render: function () {
    if (this.props.onRender) {
      this.props.onRender();
    }
    return (
      <div>
        <h1>{this.props.user.name}</h1>
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <div className="messageInput">
            <label htmlFor="stream">Stream: </label>
            <input ref="stream" type="text" value="default"
              disabled={!firebaseUtils.isLoggedIn()}/>
            <textarea ref="text" placeholder="Say something nice..."
              disabled={!firebaseUtils.isLoggedIn()}/>
          </div>
          <input type="submit" value="Post"
            disabled={!firebaseUtils.isLoggedIn()} />
        </form>
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func
  }
});

export default MessageForm;
