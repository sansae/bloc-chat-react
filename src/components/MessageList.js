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

  getTime() {
    var d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var amPm = hour >= 12 ? "PM" : "AM";
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour = hour % 12;
    }
    return `${hour}:${minute} ${amPm}`;
  }

  sendMessage = (e) => {
    e.preventDefault();
    console.log(this.state.message);
    console.log(this.props.user);
    console.log(this.props.activeRoom);
    console.log(this.getTime());
    // this.messagesRef.push(
    //   {
    //     username: this.props.username,
    //     content: this.state.message,
    //     sentAt: this.getTime(),
    //     roomId: this.props.activeRoom
    //   }
    // );
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
