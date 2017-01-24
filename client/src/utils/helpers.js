import Twitch from '../config/Twitch';

var helpers = {

  buildQuery: function(headers) {
    let params = [];
    console.log(headers);
    for(let key in headers) {
      if(headers[key] !== null && headers[key] !== undefined)
        params.push(key + '=' + headers[key]);
    }

    return encodeURI(params.join('&'));
  },

  errorHandler: function(response) {
  	if(!response.ok) throw Error(response.statusText);

  	return response.json();
  },

  authorize: function(){
    var headers = {
		response_type: "code",
		client_id: Twitch.clientID,
    // change redirect uri to deployment app
		redirect_uri: "http://localhost:3000",
		scope: "user_read channel_read",
		force_verify: "true"
	 }

  	var params = helpers.buildQuery(headers);
  	window.location = "https://api.twitch.tv/kraken/oauth2/authorize?" + params;
  },

  logout: function() {
  	localStorage.setItem("accessToken", "null");

  	window.location = "http://" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
  },

  getToken: function(code, callback) {
    var headers = {
      client_id: Twitch.clientID,
      client_secret: Twitch.secret,
      redirect_uri: "http://localhost:3000",
      grant_type: "authorization_code",
      code: code
    };

    var params = helpers.buildQuery(headers);

    fetch("https://api.twitch.tv/kraken/oauth2/token?" + params, {
      method: "POST"
    })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
  },

  getChannel: function(channelName, callback) {
    fetch("https://api.twitch.tv/kraken/channels/" + channelName, {
      method: "GET",
      headers: {
        "Client-ID": Twitch.clientID,
      }
    })
    .then(response => response.json())
    .then((channel) => {
      callback(channel);
    })
  },

  getStream: function(channelName, callback) {
    fetch("https://api.twitch.tv/kraken/streams/" + channelName, {
      method: "GET",
      headers: {
        "Client-ID": Twitch.clientID,
      }
    })
    .then(response => response.json())
    .then((stream) => {
      callback(stream);
    })
  },

  getUserTwitchAPI: function(accessToken, callback) {
    fetch("https://api.twitch.tv/kraken/user", {
      method: "GET",
      headers: {
        "Client-ID": Twitch.clientID,
        "Authorization": "OAuth " + accessToken
      }
    })
    .then(response => response.json())
    .then((user) => {
    	callback(user);
    })
  },

  getFollowed: function(accessToken, callback) {
	fetch("https://api.twitch.tv/kraken/streams/followed?stream_type=live", {
		method: "GET",
		headers: {
		  "Client-ID": Twitch.clientID,
		  "Authorization": "OAuth " + accessToken
		}
	})
	.then(response => response.json())
	.then((following) => {
	  callback(following.streams);
	})
  },

  getLocalUser: function(user, callback) {
	  var params = this.buildQuery(user);
    fetch('/user', {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: params
    })
    .then((response) => response.json())
    .then((user) => {
	  	callback(user);
	  })
  },

  getHistory: function(username, callback) {
    fetch('/' + username + '/history', {
      method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
  },

  postHistory: function(username, content, callback) {
    var params = this.buildQuery(content);
    fetch('/' + username + '/history', {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: params
    })
    .then(response => response.json())
    .then((data) => {
      callback(data)
    })
    //.catch(error => {console.log(error)})
  },

  getFavorites: function(username, callback) {
    fetch('/' + username + '/favorites', {
      method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
  },

  postFavorites: function(username, content, callback) {
    var params = this.buildQuery(content);
    fetch('/' + username + '/favorites', {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: params
    })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
  }
}


module.exports = helpers;
