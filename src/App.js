import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyAhVm_e7KVUH6GBJvn896D34glVvSJriWc",
  authDomain: "bloc-chat-react-5a1aa.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-5a1aa.firebaseio.com",
  projectId: "bloc-chat-react-5a1aa",
  storageBucket: "bloc-chat-react-5a1aa.appspot.com",
  messagingSenderId: "922105916999"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <section className="section-content">
        <aside id="left-section-aside">
          <h1 id="title">Bloc Chat</h1>
          <RoomList firebase={firebase}/>
        </aside>
        <aside id="right-section-aside">
          <MessageList firebase={firebase}/>
        </aside>
      </section>
    );
  }
}

export default App;
