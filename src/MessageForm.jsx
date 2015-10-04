import React from 'react';

import firebaseUtils from './firebaseUtils';

var MessageForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    console.log(this.props)
    if (firebaseUtils.isLoggedIn()){
      this.props.onMessageSubmit({authorId: this.props.user.id, text: text});
    }
    React.findDOMNode(this.refs.text).value = '';
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
          <input ref="text" type="text" placeholder="Say something nice..."
            disabled={!firebaseUtils.isLoggedIn()}/>
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
