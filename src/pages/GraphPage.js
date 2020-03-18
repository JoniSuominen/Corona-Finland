import React, { PureComponent } from "react";
import coronaService from "../services/corona";
import SimpleGraph from "../components/SimpleGraph";
import PieChart from "../components/PieChart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Grid from "@material-ui/core/Grid";
import utils from "../utils/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Example extends PureComponent {
  state = {
    infectionsByDate: null,
    dailyInfections: null,
    infectionsByDistrict: null
  };
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";

  componentDidMount() {
    coronaService.getSickByDate().then(confirmed => {
      this.setState({ infectionsByDate: confirmed });
    });

    coronaService.getAllByDate().then(confirmed => {
      this.setState({ dailyInfections: confirmed });
    });

    coronaService.getAllByDistrict().then(confirmed => {
      this.setState({ infectionsByDistrict: confirmed });
    });
  }

  render() {
    console.log(this.state.infectionsByDistrict);
    return (
      <div style={{ marginLeft: "15px", marginTop: "20px" }}>
        <Grid container>
        <Grid item xs={12} md={6}>
          <h5>Sairastuneiden kokonaismäärä päivittäin</h5>
          <SimpleGraph
            data={this.state.infectionsByDate}
            width={"70%"}
            xDataKey={"date"}
            xDataName={"Päivämäärä"}
            yDataName={"Sairastuneiden määrä"}
          />
          </Grid>
          <Grid item xs={12} md={6}>
          <h5>Päivän aikana sairastuneet</h5>
          <SimpleGraph
            data={this.state.dailyInfections}
            xDataKey={"date"}
            width={"70%"}
            xDataName={"Päivämäärä"}
            yDataName={"Sairastuneiden määrä"}
          />
          </Grid>
          <Grid item xs={12} md={6}>
            <h5>Sairastuneiden osuus piireittäin</h5>
            <PieChart
              data={
                this.state.infectionsByDistrict === null
                  ? this.state.infectionsByDistrict
                  : utils.sortByDistrictCount(this.state.infectionsByDistrict)
              }
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
