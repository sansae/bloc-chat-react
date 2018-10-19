import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
const http = require("http");

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
  constructor(props) {
    super(props);

    this.state = { activeRoom: "", username: "" };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      http.get("https://message-bored.herokuapp.com/");
    }, 300000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  setUser = (user) => {
    if (user !== null) {
      this.setState({username: user.displayName});
    }
  }

  selectRoom(room) {
    this.setState({ activeRoom: room.target.innerHTML });
  }

  render() {
    return (
      <section className="section-content">
        <aside id="left-section-aside">
          <h1 id="title">Welcome to Message Bored!</h1>
          <small className="text-muted">Not a typo... just a play on words ;) Are ya bored? Come join me and let's exchange messages about life!</small>
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom} handleClick={(e) => this.selectRoom(e)}/>
          <User firebase={firebase} setUser={(user) => this.setUser(user)} username={this.state.username}/>
        </aside>
        <aside id="right-section-aside">
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.username}/>
        </aside>
      </section>
    );
  }
}

export default App;
