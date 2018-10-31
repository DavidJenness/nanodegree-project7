import React, { Component } from "react"

export default class ListItem extends Component {

    render() {
        return <div class="listItem">
            <div class="list-item-header">{this.props.myLocation.name}</div>
            This is my Listing
            
            </div>

    }
}