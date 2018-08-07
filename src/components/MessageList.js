import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      userId: "",
      role: "",
      content: "",
      newContent: "",
      sentAt: "",
      roomId: "",
      allMessages: [],
    }

    this.messageRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ allMessages: this.state.allMessages.concat( message ) });
    });
    this.messageRef.on('child_removed', snapshot => {
      this.setState({ allMessages:this.state.allMessages.filter(m => m.key !== snapshot.key)});
    });
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  createMessage(e) {
    e.preventDefault();
    const item = {
      username: this.props.user.displayName,
      userId: this.props.user.uid,
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    }
    this.messageRef.push(item)
    this.setState({
      username: "",
      userId: "",
      role: "",
      content: "",
      sentAt: "",
      roomId: ""
    });
  }

  deleteMessage(item) {
    this.messageRef.child(item.key).remove();
  }

  editMessage(message) {
    const item = {
      content: this.state.newContent
    }
    this.messageRef.child(message.key).update(item);
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" name="content" placeholder="Enter message" value={this.state.content} onChange={this.handleChange} />
          {this.props.activeRoom ?
          <input type="submit" onClick={(e) => this.createMessage(e)} />
          :
          <p>There is no active room, please select</p>
          }
        </form>
        {this.state.allMessages.filter(m => m.roomId === this.props.activeRoom.key ).map( (m,index) =>
        <p key={index}>Message: {m.content}
        <br />Room: {this.props.activeRoom.roomName}<br />Username: {this.props.user.displayName}
        <button onClick={() => this.deleteMessage(m)}>Delete Message</button>
        <form>
        <input type="text" name="newContent" placeholder="edit message" defaultValue={m.content} onChange={this.handleChange} />
        <input type="submit"  onClick={() =>this.editMessage(m)} />
        </form>
        </p>)}
        {this.state.allMessages.map( m => <span><p>{m.content}</p><button onClick={() => this.deleteMessage(m)}>Delete From All Message</button></span> )}
      </div>
    );
  }
}
export default MessageList;
