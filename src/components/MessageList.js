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
        <div>
          <h1>Message List goes here.</h1>
        </div>
      </section>
    )
  }
}

export default MessageList;
