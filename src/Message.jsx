import React from 'react';
import marked from 'marked';
import format from 'date-format';

import firebaseUtils from './firebaseUtils';

var Message = React.createClass({
  rawMarkup: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

    return { __html: rawMarkup};
  },
  render: function () {
    var date = format.asString('hh:mm', new Date(this.props.message.submitedAt));
    return (
      <div className="row">
        <span className="small-10 columns" dangerouslySetInnerHTML={this.rawMarkup()} />
        <span className="small-2 columns" style={{color: "grey"}}>
          {date}
        </span>
      </div>
    );
  }
});

export default Message;
