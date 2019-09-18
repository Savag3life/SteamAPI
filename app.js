var express = require('express');
var Steam = require('steam');

var app = express();

app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next()
});

app.get('/convert/:username-:password', async (req, res) => {
  var steamClient = new Steam.SteamClient();
  var steamUser = new Steam.SteamUser(steamClient);
  console.log('a Attempting to login with username: ' + req.params.username + ' password: ' + req.params.password);
  steamClient.connect();
  steamClient.on('connected', function () {
    steamUser.logOn({
      account_name: req.params.username,
      password: req.params.password
    });
  });
  steamClient.on('logOnResponse', function (log) {
    if (log.eresult === Steam.EResult.OK) {
      res.end(JSON.stringify(log));
      steamClient.disconnect();
    } else {
      res.end(JSON.stringify({client_supplied_steamid: 0}));
      steamClient.disconnect();
    }
  });
});

app.listen(3000);
module.exports = app;