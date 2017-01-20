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

  	console.log(params);
  	window.location = "https://api.twitch.tv/kraken/oauth2/authorize?" + params;
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

  getLocalUser: function(user, callback) {
	  var params = this.buildQuery(user);
    console.log(params);
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
    console.log(params);
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