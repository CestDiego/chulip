import React from 'react';
import { Router, Route, Link } from 'react-router';
import ChatBox from './ChatBox.jsx';
/* import firebaseUtils from './firebaseUtils.js'; */

const App = React.createClass({
  render: function () {
    return (
      <ChatBox url='http://localhost:3000/api/comments' />
    )
  }
})

window.onload = () => {
  React.render(
    <Router>
      <Route path="/" component={App}></Route>
      {/* <Route path="/login" component={Login}></Route> */}
    </Router>
    ,
    document.querySelector('#container')
  );
};
