import React from 'react';
import FontAwesome from 'react-fontawesome';
/* import jQuery from 'jquery'; */
import Firebase from 'firebase';
import firebaseUtils from './firebaseUtils.js';

import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import TopBar      from './TopBar.jsx'

var messageRef = firebaseUtils.ref.child("messages");

var ChatBox = React.createClass({
  componentWillMount: function () {
    messageRef.on('value', function (snapshot) {
      this.setState({
        data: snapshot.val()
      });
    }.bind(this));
  },
  handleMessageSubmit: function (message) {
    messageRef.child(message.stream).push().set(message);
    // check if current scope has the stream
  },
  handleStreamChange: function (newStream) {
    this.setState({
      data: {
        stream: newStream
      }
    })
  },
  handleLogin: function (e) {
    if (!firebaseUtils.isLoggedIn()) {
      firebaseUtils.loginWithGitHub(function (userData) {
        this.setState({
          user: userData
        })
      }.bind(this));
    } else {
      // Doesn't update the state
      firebaseUtils.logout();
      var userData = {
        id: '-1',
        username: "guest",
        name: "Guest",
        email: "exa@mple.com",
        pic: "http://i.imgur.com/d8skZVO.webm"
      }
      this.setState({
        user: userData
      })
    }
  },
  getInitialState: function () {
    var authData = firebaseUtils.ref.getAuth();
    if (authData) {
      var userData =
      {
        id:       authData.uid,
        username: authData.github.username,
        name:     authData.github.displayName,
        email:    authData.github.email,
        pic:      authData.github.profileImageURL,
      }
    } else {
      var userData = {
        id:       "-1",
        username: "guest",
        name:     "Guest",
        email:    "guest@host.com",
        pic:      "http://i.imgur.com/d8skZVO.webm"
      }
    }
    return {
      data: {stream: "default"},
      user: userData
    }
  },
  render: function () {
    if (this.props.onRender) {
      this.props.onRender();
    }
    return (
      <div className='messageBox' >
        <h1>
          Chulip Messages
        </h1>
        <FontAwesome className='super-crazy-colors' name="rocket" size="2x" spin />
        <TopBar data={this.state.data} onStreamChange={this.handleStreamChange}/>
        <MessageList data={this.state.data} user={this.state.user} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} user={this.state.user} />

        <button onClick={this.handleLogin}>Click MAH</button>
      </div>
    );
  },
  propTypes: {
    onRender: React.PropTypes.func
  }
});

export default ChatBox;
