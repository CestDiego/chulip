import React from 'react';

import firebaseUtils from './firebaseUtils';

var MessageForm = React.createClass({
  handleSubmit: function (e) {
    var text = React.findDOMNode(this.refs.text).value.trim();
    var stream = React.findDOMNode(this.refs.stream).value.trim();

    if (!text || !stream) {
      return;
    }

    e.preventDefault();
    if (firebaseUtils.isLoggedIn()) {
      var submitedAt = new Date();
      this.props.onMessageSubmit({
        authorId: this.props.user.id,
        text: text,
        stream: stream,
        submitedAt: submitedAt.toJSON()
      });
    }
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function () {
    return (
      <form className="commentForm " onSubmit={this.handleSubmit}>
        <h3>{this.props.user.name}</h3>
        <label htmlFor="stream">Stream: </label>
        <input ref="stream" type="text" defaultValue={this.props.stream}
          disabled={!firebaseUtils.isLoggedIn()}/>
        <label htmlFor="topic">Topic: </label>
        <input ref="topic" type="text" defaultValue={this.props.topic}
          disabled={!firebaseUtils.isLoggedIn()}/>
        <textarea ref="text" placeholder="Say something nice..."
          disabled={!firebaseUtils.isLoggedIn()}/>
        <button className="button success" type="submit"
          disabled={!firebaseUtils.isLoggedIn()}>Post</button>
      </form>
    );
  }
});

export default MessageForm;
