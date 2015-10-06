import React from 'react';
import marked from 'marked';
import firebaseUtils from './firebaseUtils';

var Message = React.createClass({
  rawMarkup: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

    return { __html: rawMarkup};
  },
  render: function () {
    return (
      <span dangerouslySetInnerHTML={this.rawMarkup()} />
    );
  }
});

export default Message;
