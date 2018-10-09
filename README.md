# Message Bored

Message Bored is a messaging app that allows users to send messages in shared rooms. Users can authenticate themselves by signing in to the app via GoogleAuthProvider. Upon signing in, any messages that the user submits will be attributed to them, with their google account name appended to the message.

## Getting Started

If you would like to get this app up and running on your local machine for development and testing purposes, run the following:

```
$ git clone https://github.com/sansae/message-bored.git
$ cd message-bored
$ npm install
$ npm start
```

### Prerequisites

Make sure you have node and npm installed in your system. For instructions on how, visit [nodejs docs](https://nodejs.org/en/download/package-manager/).

After running **npm start**, wait for **react-scripts** to finish compiling the code. This might take a minute.

If you prefer to just see and test the app live without installing anything, click  [here](http://message-bored.herokuapp.com).

## Running Tests

To run both integration and unit tests:

```
$ npm test
```

To run integration or unit tests individually:

```
$ npm test spec/integration/<name-of-spec-test>
```

```
$ npm test spec/integration/<name-of-spec-test>
```

## Built With

* [React.js](https://reactjs.org/) - for the front-end
* [Firebase](https://firebase.google.com/) - for the back-end

## Authors

* **Kent Saeteurn** - [sansae](https://github.com/sansae)

## Upcoming Features

* Signed-in users can only delete their own messages
* Signed-in users can only delete their own rooms
* Guests will not be able to create new rooms
