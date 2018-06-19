import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: undefined,
      roomName: undefined,
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

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.roomName
    });
    this.setState({
      name: "",
      roomName: ""
    })
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" name="name" value={this.state.name} onChange={ () => this.handleChange } />
          <input type="text" name="roomName" value={this.state.roomName} onChange={ () => this.handleChange } />
          <input type="submit" onClick={(e) => this.createRoom(e)} />
        </form>
        {this.state.rooms.map( room => <p>{room.key}</p> )}
      </div>
    );
  }
}

export default RoomList;
