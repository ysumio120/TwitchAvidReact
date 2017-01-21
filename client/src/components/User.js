import React, {Component} from 'react';

import Twitch from '../config/Twitch';
import helpers from '../utils/helpers'

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: null
        };
    }

    componentDidUpdate() {
      if(!this.state.user && this.props.token)
        this.getUserInfo();
    }

    getUserInfo() {
      var token = this.props.token;

      helpers.getUserTwitchAPI(token, function(user) {
        helpers.getLocalUser({name: user.name}, function(user) {
          console.log(user);
        })
        this.setState({user: user});
      }.bind(this));

      // fetch('https://api.twitch.tv/kraken/user', {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/vnd.twitchtv.v5+json',
      //     'Client-ID': Twitch.clientID,
      //     'Authorization': "OAuth " + token
      //   }
      // })
      // .then(response => response.json())
      // .then(json => {
      //   if(this.props.token) {
      //     helpers.getLocalUser({name: json.name}, function(user) {
      //       console.log(user);
      //     })
      //     this.setState({user: json});
      //   }
      // });
    }

    userLogged() {
      console.log(this.state.user);
      if(this.state.user) {
        return (
        <div>
          <p >Welcome back, {this.state.user.display_name}!</p>
          {/*<img src={this.state.user.logo}/>
                    <p>Bio: {this.state.user.bio}</p>*/}
        </div>)
      } else {
        return(<p>Not Logged In</p>)
      }
    }

    render() {
        return (
            <div className="user">
              <div>{this.userLogged()}</div>
            </div>
        )

    }
}

module.exports = User;