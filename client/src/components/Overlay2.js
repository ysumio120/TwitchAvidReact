import React, { Component } from 'react';
import {Button} from 'react-foundation'

class Overlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity_back: 0,
      opacity_buttons: 0
    };
  }

  onMouseEnter() {
    this.setState({opacity_back: 0.6, opacity_buttons: 1.0});
  }

  onMouseLeave() {
    this.setState({opacity_back: 0, opacity_buttons: 0})
  }

  render() {
    let background = {
      backgroundColor: "black",
      opacity: this.state.opacity_back,
      transition: "opacity 700ms",
      height: "105px",
      width: "95px",
      zIndex: 1,
      position: "absolute",
      top: "0px",
      right: "10px"
    }

    let buttons = {
      opacity: this.state.opacity_buttons,
      transition: "opacity 500ms",
      backgroundColor: "transparent",
      fontSize: "10px",
      paddingRight: "0px",
      paddingLeft: "0px"
    }

    var isFollowing = this.props.isFollowing;
    var token = this.props.token;
    var user = this.props.user;

    return (
      <div className="Overlay" style={background} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        <ul className="overlayNavList2">
          <li><Button className="streamDelete" style={buttons} onClick={()=>this.props.removeStream(this.props.streamId)}>Close</Button></li>
          <li><Button className="select" style={buttons} onClick={() => this.props.selected(this.props.position)}>Select</Button></li>
          <li><Button className="chatSelect" style={buttons} onClick={() => this.props.setChatChannel(this.props.stream.channel.name)}>Chat</Button></li>
          <li><Button className="follow" style={buttons} onClick={() => this.props.followHandler(isFollowing, token, user.name, this.props.stream.channel.name)}>{isFollowing ? "Unfollow" : "Follow"}</Button></li>
        </ul>
      </div>
    )
  }
}

module.exports = Overlay;
