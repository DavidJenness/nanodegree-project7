import React, { Component } from "react"

export default class ListItem extends Component {

    render() {
        return <div class="listItem">
            <div class="list-item-header">{this.props.myLocation.name}</div>
            {this.props.myLocation.cuisine}
            
            </div>

    }
}