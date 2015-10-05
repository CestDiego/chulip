import React from 'react';
import marked from 'marked';
import firebaseUtils from './firebaseUtils';

var Message = React.createClass({
  rawMarkup: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

    return { __html: rawMarkup};
  },
  componentWillMount: function () {
    var authorId = this.props.authorId;
    firebaseUtils.ref.child("users").child(authorId).on('value', function (data) {
      var author = data.val()
      this.setState({
        author: author
      })
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
    }
  },
  render: function () {
    return (
      <div className='message'>
        <h2 className='messageAuthor'> {this.state.author.name} </h2>
        <img src={this.state.author.pic}  style={{height: '40px', width: '40px'}} />
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
