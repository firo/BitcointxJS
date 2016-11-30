var io 		    = 	require('socket.io-client')

eventToListenTo = 'tx';
room = 'inv';

var socket = io('https://insight.bitpay.com');

socket.on('connect', function() {
  socket.emit('subscribe', room);
});

socket.on(eventToListenTo, function(data) {
  //console.log("New transaction received: " + JSON.stringify ( data , null , 4 ));
  console.log(data.txid);
});
