import React, { Component } from "react"
import ListItem from "./ListItem";

export default class ResultList extends Component {

    render() {
        return <div>

            {this.props.locations.map(marker => (
                <ListItem/>
            ))}

    
        </div>

    }
}