import React, {Component} from 'react';

class User extends Component {
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user)
    })
  }

  signInWithPopup = (e) => {
    e.preventDefault();

    const provider = new this.props.firebase.auth.GoogleAuthProvider();

    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut = (e) => {
    this.props.firebase.auth().signOut().then(function() {
      console.log('Sign-out Successful!');
      window.location.reload();
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  render() {
    return (
      <div id="user">
        <p id="user-status">{this.props.username ? `${this.props.username} Is Logged In` : `Currently Logged In As Guest`}</p>

        <button id="sign-in" type="button" onClick={(e) => this.signInWithPopup(e)}>Sign In</button>

        <button id="sign-out" type="button" onClick={(e) => this.signOut(e)}>Sign Out</button>
      </div>
    )
  }
}

export default User;
