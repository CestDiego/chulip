import React from 'react';
import MessagesBox from './MessagesBox.jsx';
import firebaseUtils from './firebaseUtils.js';

var MessageList = React.createClass({
  render: function () {
    // Firebase gives Objects instead of arrays
    var Messages = this.props.messages;

    var messageArray = [];
    var currentIndex = 0;
    var prevMessage;
    Object.keys(Messages).forEach(function (messageKey, keyIndex, array) {
      var message = Messages[messageKey]
      var authorId =  message.authorId;
      var lastIndex = messageArray.length != 0 ? messageArray.length -1 : 0;
      if (prevMessage == undefined) {
        messageArray.push({
          authorId: authorId,
          messages: [message]
        })
      } else {
        if (prevMessage.authorId == message.authorId) {
          if (messageArray[lastIndex] == undefined) {
            messageArray[lastIndex] = {
              authorId: authorId,
              messages: [message]
            }
          } else {
            messageArray[lastIndex].messages.push(message);
          }
        } else {
          // Case Zero where nothing is define
          console.log(" no arraty" + messageArray);
          messageArray.push({
            authorId: authorId,
            messages: [message]
          });
          currentIndex = currentIndex + 1;
        }
      }
      prevMessage = message
    });
    console.log("le Message Array");
    console.log(messageArray)
    var messageNodes = messageArray.map(function (messageList) {
      return (
        <MessagesBox className="large-6 columns" authorId={messageList.authorId} messages={messageList.messages}>
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
