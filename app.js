var express = require('express');
var SteamUser = require('steam-user');
var app = express();
var spawn = require('child_process');

app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next()
});

app.get('/convert/:username&:password', (req, res) => {
  var client = new SteamUser();
  console.log('a Attempting to login with username: ' + req.params.username + ' password: ' + req.params.password);

  client.logOn({
    "accountName": req.params.username,
    "password": req.params.password
  });
  

  client.on('loggedOn', function(details) {
    console
    console.log(JSON.stringify(details));
    console.log("Logged into Steam as " + client.steamID.getSteamID64());
    res.end(JSON.stringify({ response: "good", id: client.steamID.getSteamID64() }))
  });

  client.on('error', function(e) {
    res.end(JSON.stringify({ response: "bad", id: 0 }));
  });

});

process.on('uncaughtException', function (err) {
  console.log("Error logging into steam...");
});

app.listen(3000);