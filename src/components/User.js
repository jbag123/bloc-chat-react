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
          <button onClick={this.signIn.bind(this)}>Log In</button>
          :
          <div>
          <p>{this.props.displayName}</p>
          <button onClick={this.signnOut.bind(this)}>Log Out </button>
          </div>
        }
      </div>
    )
  }

}

export default User;
