import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ChatBox from './components/ChatBox.jsx';
/* import firebaseUtils from './firebaseUtils.js'; */

let store =  createStore(ChatBox);

window.onload = () => {
  let rootElement = document.querySelector('#container');

  React.render(
    <Provider store={store}>
      {() => <ChatBox/>}
    </Provider>, rootElement);
};
