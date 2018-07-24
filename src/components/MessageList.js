import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

    if (this.props.activeRoom) {
      if (this.state.message === "") {
        alert("Empty messages are not allowed. If you don't have anything to say, go away ;)")
        return;
      }

      this.messagesRef.push(
        {
          username: user,
          content: this.state.message,
          sentAt: `${this.getDate()} -- ${this.getTime()}`,
          roomId: this.props.activeRoom
        }
      );
    } else {
      alert('Please Select A Room First Before Attempting To Send A Message');
    }

    this.setState({ message: "" });
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  deleteMessage = (e, message, index) => {
    e.preventDefault();
    this.messagesRef.child(message.key).remove();

    this.state.messages.splice(index, 1);
    this.setState({ messages: this.state.messages });
  }

  submit = (e, message, index) => {
    confirmAlert({
      title: "Confirm to Submit",
      message: `Are you sure you want to delete this message?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.deleteMessage(e, message, index);
          }
        },
        {
          label: "No",
          onClick: () => {
            return false;
          }
        }
      ]
    })
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
                  <div id="message-container">
                    <div>
                      <div id="metadata">
                        {message.username}
                        <br></br>
                        {message.sentAt}
                      </div>
                      <div id="message-body">
                        <span>Message:</span>
                        <br></br>
                        <span>{message.content}</span>
                        <br></br>
                        <div>
                          <span id="delete" onClick={(e) => this.submit(e, message, index)}>Delete Message</span>
                        </div>
                      </div>
                    </div>
                    <hr id="line"></hr>
                  </div> : ""
                }
              </div>
            ) : ""
          }
        </div>
        <div id="new-message">
          {
            this.props.activeRoom ?
            (
              <div>
                <input id="message-input" type="text" placeholder="Write your message here..." value={this.state.message} onChange={(e) => this.handleChange(e)}></input>
                <button type="submit" onClick={(e) => this.sendMessage(e)}>Send</button>
              </div>
            ) : ""
          }
        </div>
      </section>
    )
  }
}

export default MessageList;
