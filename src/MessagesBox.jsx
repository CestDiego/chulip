import React from 'react';
import marked from 'marked';
import firebaseUtils from './firebaseUtils';
import Message from './Message.jsx';

var MessagesBox = React.createClass({
  componentWillMount: function () {
    var authorId = this.props.messages[0].authorId;

    firebaseUtils.ref.child("users").child(authorId).on('value', function (data) {
      var author = data.val();

      this.setState({
        author: author
      });
    }.bind(this));
  },
  getInitialState: function () {
    return {
      author: {
        username: "guest",
        name: "Guest",
        email: "gyuest@goma.com",
        pic: "http://i.imgur.com/d8skZVO.webm"
      }
    };
  },
  render: function () {
    var messages = this.props.messages.map(function (message) {
      return (
        <Message message={message}>
          {message.text}
        </Message>
      )
    })
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
  },
  propTypes: {
    onRender: React.PropTypes.func,
    authorId: React.PropTypes.string
  }
});

export default MessagesBox;
