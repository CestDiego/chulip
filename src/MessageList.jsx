import React from 'react';
import MessagesBox from './MessagesBox.jsx';
import firebaseUtils from './firebaseUtils.js';

import mori from 'mori';

var MessageList = React.createClass({
  render: function () {
    // Firebase gives Objects instead of arrays
    var Messages = this.props.messages;

    var messageArray = [];
    var currentIndex = 0;
    var prevMessage;

    var messages = Object.keys(Messages).map(function(messageKey){
      return Messages[messageKey]
    });
    var messageArray = mori.toJs(mori.partitionBy(
      (message) => {
        return message.authorId;
      } , messages));
    console.log(messageArray);

    var messageNodes = messageArray.map(function (messageList) {
      return (
        <MessagesBox className="large-6 columns" messages={messageList}>
        </MessagesBox>
      );
    })
    return (
      <div className='messageList row'>
        <div className="large-12 columns">
          {messageNodes}
        </div>
      </div>
    );
  }
});

export default MessageList;
