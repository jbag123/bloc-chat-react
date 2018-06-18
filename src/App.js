import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAIEoSm2T85Fd85TY2K8bmHX3AjBkauwXQ",
  authDomain: "test-58b63.firebaseapp.com",
  databaseURL: "https://test-58b63.firebaseio.com",
  projectId: "test-58b63",
  storageBucket: "test-58b63.appspot.com",
  messagingSenderId: "105166771591"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <RoomList
        firebase={firebase}
       />
    );
  }
}

export default App;
