import React from "react";
import Paper from "material-ui";
import SimpleGraph from "SimpleGraph.js"

class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        <Paper>
            <SimpleGraph props = {this.props}>
            </SimpleGraph>

            
        </Paper>
    }
}