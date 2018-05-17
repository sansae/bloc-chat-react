import React, {Component} from 'react';

class User extends Component {

  signInWithPopup = (e) => {
    e.preventDefault();

    const provider = new this.props.firebase.auth.GoogleAuthProvider();

    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut = (e) => {
    console.log('signOut executed');
    this.props.firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  render() {
    return (
      <div id="btn-div">
        <button id="sign-in" type="button" onClick={(e) => this.signInWithPopup(e)}>Sign In</button>
        <button id="sign-out" type="button" onClick={(e) => this.signOut(e)}>Sign Out</button>
      </div>
    )
  }
}

export default User;
