import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: '',
      roomName: '',
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      console.log(snapshot.val());
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
      room: this.state.room,
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
          <input type="text" name="room" value={this.state.room} onChange={this.handleChange} />
          <input type="text" name="roomName" value={this.state.roomName} onChange={this.handleChange} />
          <input type="submit" onClick={(e) => this.createRoom(e)} />
        </form>
        {this.state.rooms.map( (r,index) => <div key={index}><p>{r.room} - {r.roomName}</p></div> )}
      </div>
    );
  }
}

export default RoomList;
