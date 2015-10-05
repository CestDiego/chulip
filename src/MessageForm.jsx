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
    if (this.props.onRender) {
      this.props.onRender();
    }
    return (
      <div className="row large-12 columns">
        <h3>{this.props.user.name}</h3>
        <form className="commentForm " onSubmit={this.handleSubmit}>
          <label htmlFor="stream">Stream: </label>
          <input ref="stream" type="text" defaultValue={this.props.stream}
            disabled={!firebaseUtils.isLoggedIn()}/>
          <textarea ref="text" placeholder="Say something nice..."
            disabled={!firebaseUtils.isLoggedIn()}/>
          <button className="button success" type="submit"
            disabled={!firebaseUtils.isLoggedIn()}>Post</button>
        </form>
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func
  }
});

export default MessageForm;
