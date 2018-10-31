import React, { Component } from "react";

export class Information extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.selectedPlace.name}</h1>
        <p>{this.props.selectedPlace.name}</p>
      </div>
    );
  }
}
