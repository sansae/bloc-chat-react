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

    if (this.state.name === "") {
      alert("The name of the room cannot be empty. Please enter a room name");
      return;
    }

    this.roomsRef.push({ name: this.state.name });
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  deleteRoom = (e, room, index) => {
    e.preventDefault();
    this.roomsRef.child(room.key).remove();

    this.state.rooms.splice(index, 1);
    this.setState({rooms: this.state.rooms})
  }

  render() {
    return(
      <section id="rooms">
        <p>Select A Room</p>
        {
          this.state.rooms.map((room, index) =>
            <div key={index}>
              <p onClick={(e) => this.props.handleClick(e)}>{room.name}</p>
              <button onClick={(e) => this.deleteRoom(e, room, index)}>x</button>
            </div>
          )
        }

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
