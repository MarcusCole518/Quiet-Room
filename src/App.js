import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './Components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RoomList firebase ={firebase} />
        </header>
      </div>
    );
  }
}

export default App;
