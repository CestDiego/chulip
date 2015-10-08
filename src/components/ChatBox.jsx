import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import firebaseUtils from './firebaseUtils.js';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import TopBar      from './TopBar.jsx';
import SidePanel   from './SidePanel.jsx';

var messagesRef = firebaseUtils.ref.child("messages");

class ChatBox extends Component {
  componentWillMount() {
    var stream = this.state.stream;
    var streamRef = messagesRef.child(stream);

    messagesRef.once('value', function (globalMessages) {
      var messages = globalMessages.val();

      this.setState({
        streamList: Object.keys(messages)
      });
    }.bind(this));

    streamRef.on('value', function (messagesRef) {
      var messages = messagesRef.val();

      this.setState({
        messages: messages
      });
    }.bind(this));
  }

  handleMessageSubmit(message) {
    messagesRef.child(message.stream).push().set(message);
    // check if current scope has the stream
  }

  handleStreamChange(newStream) {
    var streamRef = messagesRef.child(newStream);

    this.setState({
      stream: newStream
    });

    // update me
    streamRef.once('value', function (messagesRef) {
      var messages = messagesRef.val();

      this.setState({
        messages: messages
      });
    }.bind(this));
  }

  handleLogin(e) {
    var defaultUserData = {
      id: '-1',
      username: "guest",
      name: "Guest",
      email: "exa@mple.com",
      pic: "http://i.imgur.com/d8skZVO.webm"
    };

    if (!firebaseUtils.isLoggedIn()) {
      firebaseUtils.loginWithGitHub(function (userData) {
        this.setState({
          user: userData
        });
      }.bind(this));
    } else {
      // Doesn't update the state
      firebaseUtils.logout();
      this.setState({
        user: defaultUserData
      });
    };
  }

  constructor(props) {
    var authData = firebaseUtils.ref.getAuth();
    var userData = {};

    super(props);

    if (authData) {
      userData = {
        id:       authData.uid,
        username: authData.github.username,
        name:     authData.github.displayName,
        email:    authData.github.email,
        pic:      authData.github.profileImageURL
      };
    } else {
      userData = {
        id:       "-1",
        username: "guest",
        name:     "Guest",
        email:    "guest@host.com",
        pic:      "http://i.imgur.com/d8skZVO.webm"
      };
    };

    this.state =  {
      stream: "default",
      topic: "",
      streamList: ["default"],
      messages: {},
      user: userData
    };
  }
  render() {
    const { dispatch } = this.props;
    return (
      <div className='messageBox' >
        <h1> Chulip Messages </h1>

        <button className="button tiny" onClick={this.handleLogin}>Click MAH</button>

        <TopBar stream={this.state.stream} streamList={this.state.streamList}
          onStreamChange={this.handleStreamChange}/>
        <div className="row">
          <div className="medium-12 large-6 columns">
            <MessageList stream={this.state.stream}
              messages={this.state.messages} user={this.state.user} />
            <MessageForm stream={this.state.stream} topic={this.state.topic}
              onMessageSubmit={this.handleMessageSubmit} user={this.state.user} />
          </div>
          <div className="large-6 columns show-for-medium-up ">
            <SidePanel />
          </div>
        </div>
      </div>
    );
  }
}

export default App
