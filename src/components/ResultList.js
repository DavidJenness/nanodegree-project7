import React, { Component } from "react";
import ListItem from "./ListItem";

export default class ResultList extends Component {
  state = {
    searchText: ""
  };
  handleChange = (event) => {
      this.setState({searchText: event.target.value})
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" value={this.state.searchText} onChange={this.handleChange}/> 
        </form>
        {this.props.locations.map(myLocation => (
          <ListItem myLocation={myLocation} />
        ))}
      </div>
    );
  }
}
