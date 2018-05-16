import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: [] };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    })
  }

  render() {
    return (
      <section>
        <div className="messages">
          <p>Click on a room from the list on the left.</p>
          <h1>{this.props.activeRoom}</h1>
        </div>
        <div>
          {
            this.state.messages.map(
              (message, index) =>
              <p key={index}>{message.content}</p>)
          }
        </div>
      </section>
    )
  }
}

export default MessageList;
