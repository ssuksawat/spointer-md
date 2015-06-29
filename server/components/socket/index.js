module.exports = function(server) {
  var io = require('socket.io')(server);
  var clientList = {};
  var roomList = {};

  io.set('log level', 1);

  io.on('connection', function(client) {
    console.log('user connected: ', client.id);

    client.on('createRoom', function(name) {
      //get unique 6-digit room number
      var rand = Math.floor(Math.random() * 900) + 100;
      while(roomList[rand]) {
        rand = Math.floor(Math.random() * 900) + 100;
      }

      //update roomList and clientList
      roomList[rand] = {people: [name]};
      clientList[client.id] = {name: name, room: rand};
      client.join(rand);
      client.emit('roomCreated', rand);

      console.log('room created: ', rand);
    });

    client.on('joinRoom', function(info) {
      clientList[client.id] = {name: info.name, room: info.room};
      roomList[info.room].people.push(info.name);
      client.join(info.room);
      io.to(info.room).emit('updateRoom', {name: info.name, room: roomList[info.room]});

      console.log('client ' + info.name + ' has joined room ' + info.room);
    });

    client.on('disconnect', function() {
      console.log('client disconnected: ', client.id);
      var info = clientList[client.id];

      if(info) {
        //remove user from room
        var index = roomList[info.room].people.indexOf(info.name);
        if (index > -1) {
          roomList[info.room].people.splice(index, 1);
        }
        //remove user info
        delete clientList[client.id];

        client.broadcast.to(info.room).emit('userDisconnect', {name: info.name, room: roomList[info.room]});
      }
    });

    client.on('sendChat', function(message) {
      var info = clientList[client.id];

      io.to(info.room).emit('chatReceived', {name: info.name, message: message});
    });

    client.on('sendVote', function(vote) {
      var info = clientList[client.id];

      client.broadcast.to(info.room).emit('voteReceived', {name: info.name, vote: vote});
    });

  });
};
