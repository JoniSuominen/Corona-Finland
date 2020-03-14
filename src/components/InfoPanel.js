import React from "react";
import Paper from "@material-ui/core/Paper";
import SimpleGraph from "./SimpleGraph.js"

class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Paper>
                <h1>{this.props.name}</h1>
                <h2>Sairastuneita: {this.props.infected !== null && this.props.infected[this.props.name] !== undefined ? this.props.infected[this.props.name].infections:console.log(this.props.infected)}</h2>
                <SimpleGraph data={this.props.infectionsByDate}
                xDataKey={"date"}
                xDataName={"Päivämäärä"}
                yDataName={"Sairastuneiden määrä"}/>
                
            </Paper>
        )
    }
}
export default InfoPanel;