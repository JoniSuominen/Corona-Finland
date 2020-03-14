import React from "react";
import coronaService from "../services/corona";
import Map from "../components/Map";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

var data = require("../data/districtmap.json");
var geojson = require("../data/shpNew.json");

const bounds = [
  [71.035597, 18.032228],
  [59.269625, 33.105469]
];

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 4,
    textAlign: "center",
    color: "white"
  }
});

class MapPage extends React.Component {
  state = {
    render: true,
    infections: null,
    deaths: null
  };

  componentDidMount() {
    coronaService.getAllInfection().then(confirmed => {
      this.setState({ infections: confirmed });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={9}>
            <Map></Map>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MapPage);
