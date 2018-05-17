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

  getDate() {
    var currentDate = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var dayOfWeek = days[currentDate.getDay()];
    var month = months[currentDate.getMonth()];
    var dayOfMonth = currentDate.getDate();
    var year = currentDate.getFullYear();

    return dayOfWeek + ", " + month + " " + dayOfMonth + ", " + year;
  }


  getTime() {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
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

    var user = this.props.user ? this.props.user : "Guest";

    this.messagesRef.push(
      {
        username: user,
        content: this.state.message,
        sentAt: `${this.getDate()} -- ${this.getTime()}`,
        roomId: this.props.activeRoom
      }
    );

    this.setState({ message: "" });
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
