import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
      this.setState({ rooms: this.state.rooms.concat(room) });
    })
  }

  createRoom = (e) => {
    e.preventDefault();

    if (this.state.name === "") {
      alert("The name of the room cannot be empty. Please enter a room name");
      return;
    }

    this.roomsRef.push({ name: this.state.name });
    this.setState({ name: "" });
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  deleteRoom = (e, room, index) => {
    e.preventDefault();
    this.roomsRef.child(room.key).remove();

    this.state.rooms.splice(index, 1);
    this.setState({ rooms: this.state.rooms });
  }

  submit = (e, room, index) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-alert'>
            <h1>Confirm to Submit</h1>
            <p>Are you sure you want to delete {room.name}?</p>
            <button id="yes-btn" onClick={() => {
                this.deleteRoom(e, room, index);
                onClose()
            }}>Yes</button>
            <button id="no-btn" onClick={onClose}>No</button>
          </div>
        )
      }
    })
  }

  render() {
    return(
      <section id="rooms">
        <p>Select A Room</p>
        <div id="rooms-container">
          {
            this.state.rooms.sort((a, b) => {
              var roomA = a.name.toUpperCase();
              var roomB = b.name.toUpperCase();
              return roomA < roomB ? -1 : 1;
            }).map((room, index) =>
              <div className="rooms" key={index}>
                <p onClick={(e) => this.props.handleClick(e)}>{room.name}</p>
                <button onClick={(e) => this.submit(e, room, index)}>Delete Room</button>
              </div>
            )
          }
        </div>

        <div>
          <form onSubmit={(e) => this.createRoom(e)} id="room-form">
            <div>
              <label id="room-label" htmlFor="create-room">Create New Room</label>
            </div>
            <div>
              <input id="room-input" type="text" name="create-room" ref="room-input" placeholder="Enter Room Name" value={this.state.name} onChange={(e) => this.handleChange(e)}></input>
              <button id="submit-btn" type="submit" form="room-form">Submit</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default RoomList;
