import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';
import User from './Components/User';

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
    activeRoom: {
      name: "",
      roomID: "",
      roomName: ""
    },
    user: null
  }

  roomChangeHandler(e) {
    this.setState({activeRoom: e});
  }

  setUser(user) {
    this.setState({user: user})
  }

  render() {
    console.log(this.state.activeRoom.name)
    return (
      <div className="App">
        <header className="App-header">
        <div>
          <RoomList
            firebase ={firebase}
            roomChanged={this.roomChangeHandler.bind(this)}
            activeRoom={this.state.activeRoom.name} />
        </div>
        <div>
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            roomChanged={this.roomChangeHandler.bind(this)}
            user={this.state.user} />
        </div>
        <div>
          <User
          firebase={firebase}
          setUser={this.setUser.bind(this)}
          user={this.state.user} />
        </div>
        </header>
      </div>
    );
  }
}

export default App;
