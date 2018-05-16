import React, {Component} from 'react';

class User extends Component {

  signInWithPopup = (e) => {
    e.preventDefault();
    // console.log('signInWithPopup executed');

    const provider = new this.props.firebase.auth.GoogleAuthProvider();

    this.props.firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div id="btn-div">
        <button id="user-btn" type="button" onClick={(e) => this.signInWithPopup(e)}>Sign In</button>
      </div>
    )
  }
}

export default User;
