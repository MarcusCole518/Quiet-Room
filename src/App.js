import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';

var config = {
  apiKey: "AIzaSyDj7sIyMaeeHqK80p9zRlKcwIIn6D-UGcI",
  authDomain: "bloc-chat-5a92a.firebaseapp.com",
  databaseURL: "https://bloc-chat-5a92a.firebaseio.com",
  projectId: "bloc-chat-5a92a",
  storageBucket: "bloc-chat-5a92a.appspot.com",
  messagingSenderId: "605153370238"
};
firebase.initializeApp(config);

class App extends Component {

  state = {
    activeRoom: RoomList
  }

  roomChangeHandler(room) {
    this.setState({activeRoom: room})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RoomList firebase ={firebase} />
          <MessageList firebase={firebase} />
        </header>
      </div>
    );
  }
}

export default App;
