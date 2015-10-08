import React, { Component } from 'react';
import marked from 'marked';

export default class Message extends Component {

  rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

    return {
      __html: rawMarkup
    };
  }

  render() {
    return (
      <span dangerouslySetInnerHTML={this.rawMarkup()} />
    );
  }
}
