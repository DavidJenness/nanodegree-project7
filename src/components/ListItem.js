import React, { Component } from "react";

export default class ListItem extends Component {
  render() {
    return (
      <div className="listItem">
        <div className="list-item-header">{this.props.myLocation.name}</div>
        {this.props.myLocation.cuisine}
      </div>
    );
  }
}
