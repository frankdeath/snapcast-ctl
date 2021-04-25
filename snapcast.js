#!/usr/bin/env node

//const EventEmitter = require("events");
const WebSocket = require("isomorphic-ws");

// Create WebSocket connection.
//const socket = new WebSocket('ws://10.0.1.11:1780/jsonrpc');
let socket = new WebSocket('ws://10.0.1.11:1780/jsonrpc');

// Connection opened
socket.addEventListener('open', function(event) {
    // alert is only used in web browsers
    //alert("[open] Connection established");
    console.log("[open] Connection established");
    
    // Send a query to the server
    socket.send(JSON.stringify({"id":1,"jsonrpc":"2.0","method":"Server.GetStatus"}));
});

// Listen for messages
socket.addEventListener('message', function(event) {
    console.log('[message] Data received from server', event.data);
});

socket.onclose = function(event) {
  if (event.wasClean) {
    //alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    //alert('[close] Connection died');
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  //alert(`[error] ${error.message}`);
  console.log(`[error] ${error.message}`);
};
