import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const http = require("http");

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

setInterval(() => {
  http.get("https://message-bored.herokuapp.com/");
}, 300000);
