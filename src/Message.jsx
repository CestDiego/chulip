import React from 'react';
import marked from 'marked';

var Message = React.createClass({
  rawMarkup: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

    return { __html: rawMarkup};
  },
  render: function () {
    return (
      <div className='message'>
        <h2 className='messageAuthor'>
          {this.props.authorId}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func,
    authorId: React.PropTypes.string
  }
});

export default Message;
