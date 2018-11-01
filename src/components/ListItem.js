import React, { Component } from "react";

export default class ListItem extends Component {

  handleEvent = event => {
    alert("I was clicked");
  };

  render() {
    return (
      <div className="listItem">
        <button className="list-item-header" type="button" onClick={this.handleEvent}>{this.props.myLocation.name}</button>
        {this.props.myLocation.cuisine}
      </div>
    );
  }
}
