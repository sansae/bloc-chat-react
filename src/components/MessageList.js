import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: [], message: "" };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    })
  }

  sendMessage = (e) => {
    e.preventDefault();
    console.log('sendMessage executed');
    console.log(this.state.message);
    // this.messagesRef.push({ username: this.props.username });
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <section>
        <div className="room-title">
          <h1>{this.props.activeRoom}</h1>
        </div>
        <div id="messages">
          {
            this.props.activeRoom ? this.state.messages.map(
              (message, index) =>
              <div key={index}>
                {
                  this.props.activeRoom.includes(message.roomId) ?
                  <div>
                    <p>
                      <span>Username: {message.username}</span>
                      <br></br>
                      <span>Sent At: {message.sentAt}</span>
                      <br></br>
                      Message: {message.content}
                    </p>
                  </div> : ""
                }
              </div>
            ) : ""
          }
        </div>
        <div>
          <input id="message-input" type="text" placeholder="Write your message here..." value={this.state.message} onChange={(e) => this.handleChange(e)}></input>
          <button type="submit" onClick={(e) => this.sendMessage(e)}>Send</button>
        </div>
      </section>
    )
  }
}

export default MessageList;
