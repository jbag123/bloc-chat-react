import React, { Component } from 'react';

class RoomList extends App {
  constructor(props) {
    super(props);


  this.state = {
    rooms: []
  }

  this.roomosRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomosRef.on('child_added', snapshot => {
      console.log(snapshot);
    })
  }

  render() {
    return(

    )
  }
}
