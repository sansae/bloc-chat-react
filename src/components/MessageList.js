import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: [] };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  render() {
    return (
      <section>
        <div className="messages">
          <p>Click on a room from the list on the left.</p>
          <h1>{this.props.activeRoom}</h1>
        </div>
      </section>
    )
  }
}

export default MessageList;
