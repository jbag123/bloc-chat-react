import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: '',
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  createRoom(e) {
    e.preventDefault();
    const item = {
      roomName: this.state.roomName
    }
    this.roomsRef.push(item);
    this.setState({
      roomName: ''
    })
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" name="roomName" value={this.state.roomName} onChange={this.handleChange } />
          <input type="submit" onClick={(e) => this.createRoom(e)} />
        </form>
        {this.state.rooms.map( (room, index) => <p key={index}>{room.key}</p> )}
      </div>
    );
  }
}

export default RoomList;
