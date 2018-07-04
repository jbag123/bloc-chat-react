import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  login() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
}

  render() {
    return(
      <div>
        {this.state.user ?
          <button onClick={this.logout}>Log Out</button>
          :
          <button onClick={this.login}>Log In</button>
        }
      </div>
    )
  }

}

export default User;
