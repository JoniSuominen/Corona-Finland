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
                <h2>Sairastuneita: {this.props.infected !== undefined ? this.props.infected.infections:0}</h2>
                <SimpleGraph data={this.props.data !== null ? this.props.data.confirmed:[]}
                xDataKey={"date"}
                xDataName={null}
                yDataName={"Sairastuneiden määrä"}/>
                <h2>Kuolleita: {this.props.infected !== undefined ? this.props.infected.deaths:0}</h2>
                <SimpleGraph data={this.props.data !== null ? this.props.data.deaths:[]}
                xDataKey={"date"}
                xDataName={"Päivämäärä"}
                yDataName={"Kuolleiden määrä"}/>
                <h2>Parantuneita: {this.props.infected !== undefined ? this.props.infected.recovered:0}</h2>
                <SimpleGraph data={this.props.data !== null ? this.props.data.recovered:[]}
                xDataKey={"date"}
                xDataName={"Päivämäärä"}
                yDataName={"Parantuneiden määrä"}/>
                
            </Paper>
        )
    }
}
export default InfoPanel;