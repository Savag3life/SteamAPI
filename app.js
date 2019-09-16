var express = require('express');
var Steam = require('steam');

var steamClient = new Steam.SteamClient();
var steamUser = new Steam.SteamUser(steamClient);

var app = express();

app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next()
});

app.get('/convert/:username-:password', async (req, res) => {
  console.log('a Attempting to login with username: ' + req.params.username + ' password: ' + req.params.password);
  steamClient.connect();
  steamClient.on('connected', function () {
    steamUser.logOn({
      account_name: req.params.username,
      password: req.params.password
    });
  });
  steamClient.on('logOnResponse', function (log) {res.end(JSON.stringify(log))});
});

app.listen(3000);
module.exports = app;