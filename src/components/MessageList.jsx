import React, { Component } from 'react';
import mori from 'mori';

import MessagesBox from './MessagesBox.jsx';

export default class MessageList extends Component{
  render() {
    // Firebase gives Objects instead of arrays
    var Messages = this.props.messages;

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
    });
    return (
      <div className='messageList row'>
        <div className="large-12 columns">
          {messageNodes}
        </div>
      </div>
    );
  }
}
