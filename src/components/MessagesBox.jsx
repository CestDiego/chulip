import React, { Component } from 'react';

import firebaseUtils from './firebaseUtils.js';
import Message from './Message.jsx';

export default class MessagesBox extends Component {
  componentWillMount() {
    var authorId = this.props.messages[0].authorId;

    firebaseUtils.ref.child("users").child(authorId).on('value',
      data => {
        var author = data.val();
        this.setState({
          author: author
        });
      }
    );
  }

  constructor(props) {
    super(props);
    this.state =  {
      author: {
        username: "guest",
        name: "Guest",
        email: "gyuest@goma.com",
        pic: "http://i.imgur.com/d8skZVO.webm"
      }
    };
  }

  render() {
    var messages = this.props.messages.map(function (message) {
      return (
        <Message message={message}>
          {message.text}
        </Message>
      )
    });

    return (
      <div className='message row'>
        <div className="small-2 columns">
          <img src={this.state.author.pic} style={{height: '40px', width: '40px'}} />
        </div>
        <div className="small-10 columns">
          {messages}
        </div>
        <hr/>
      </div>
    );
  }
}
