import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = { rooms: [], name: '' };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room)});
    })
  }

  createRoom = (e) => {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name });
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleClick = (e) => {
    console.log(e.target.innerHTML);
  }

  render() {
    return(
      <section id="rooms">
        <div>
          {
            this.state.rooms.map((room, index) =>
              <p onClick={(e) => this.handleClick(e)} key={index}>{room.name}</p>
            )
          }
        </div>
        <div>
          <form onSubmit={(e) => this.createRoom(e)} id="room-form">
            <label id="room-label" htmlFor="create-room">**Create New Room**</label>
            <input id="room-input" type="text" name="create-room" ref="room-input" placeholder="Enter Room Name" value={this.state.name} onChange={(e) => this.handleChange(e)}></input>
            <button id="submit-btn" type="submit" form="room-form">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default RoomList;
