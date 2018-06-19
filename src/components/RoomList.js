import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

  this.state = {
    rooms: []
  };

  this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom() {
    
  }

  render() {
    let val;
    return(
      <div>
        <form>
          <input type="text" value={val}>
          <input typr="submut" value={this.setState{( room: val )}>
        </form>
      </div>
    );
  }
}

export default RoomList;
