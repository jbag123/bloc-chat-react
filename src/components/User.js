import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signnOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return(
      <div>
        {this.props.user === null ?
          <button onClick={this.signIn}>Log In</button>
          :
          <button onClick={this.signnOut}>Log Out</button>
        }
      </div>
    )
  }

}

export default User;
