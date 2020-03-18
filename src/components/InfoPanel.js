import React from "react";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import SimpleGraph from "./SimpleGraph.js"
import formatter from "../utils/dataFormatter";
class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {cumulative:false}

    handleCumulative = event => {
        console.log(event.target.checked)
        this.setState({cumulative:event.target.checked})
    }

    graphRenderer = (data, variableName, yLabel) => {
        if(this.props.data !== null && this.props.data[variableName] !== undefined &&this.props.data[variableName].length > 0) {
            let plottable = this.state.cumulative ? formatter.cumulativeSum(data[variableName]):data[variableName];
            return(<SimpleGraph data={plottable}
                    xDataKey={"date"}
                    width='100%'
                    xDataName={null}
                    yDataName={yLabel}/>);
        }
        else {
            return(<div/>)
        }  

    }
    render() {

        return(
            <Paper style={{paddingLeft: "10%"}}>
                <h1>{this.props.name}</h1>
                <FormControlLabel control = {
                <Switch
                    checked={this.state.cumulative}
                    onChange={this.handleCumulative}
                    value="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />}
                label = "Kumulatiivinen"/>
                <h2>Sairastuneita: {this.props.infected !== undefined ? this.props.infected.infections:0}</h2>
                {this.graphRenderer(this.props.data, "confirmed", "Todettuja")}
                <h2>Kuolleita: {this.props.infected !== undefined ? this.props.infected.deaths:0}</h2>
                {this.graphRenderer(this.props.data, "deaths", "Kuolleita")}
                <h2>Parantuneita: {this.props.infected !== undefined ? this.props.infected.recovered:0}</h2>
                {this.graphRenderer(this.props.data, "recovered", "Parantuneita")}
                
            </Paper>
        )
    }
}
export default InfoPanel;