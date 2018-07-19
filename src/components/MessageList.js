import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      allMessages: [],
      displayedMessages: []
    }

    this.messageRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  scrollToLastMessage = () => {
    this.bottomOfMessages.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ allMessages: this.state.allMessages.concat( message ) });
      this.setState({ displayedMessages: this.state.allMessages.filter(m => m.roomId === this.props.activeRoom.key ) }, () => this.scrollToLastMessage() );
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ displayedMessages: this.state.allMessages.filter(m => m.roomId === nextProps.activeRoom.key ) }, () => this.scrollToLastMessage() );
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
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    }
    this.messageRef.push(item)
    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    });
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
        {this.state.allMessages.filter(m => m.roomId === this.props.activeRoom.key ).map( (m,index) => <p key={index}>Message: {m.content}<br />Room: {this.props.activeRoom.roomName}<br />Username: {this.props.user.displayName}</p>)};
        <div ref={(thisDiv) => this.bottomOfMessages = thisDiv}></div>
      </div>
    );
  }
}
export default MessageList;
