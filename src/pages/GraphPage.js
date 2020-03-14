import React, { PureComponent } from "react";
import coronaService from "../services/corona";
import SimpleGraph from "../components/SimpleGraph";
import PieChart from "../components/PieChart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
      console.log(confirmed);
      this.setState({ infectionsByDate: confirmed });
    });

    coronaService.getAllByDate().then(confirmed => {
      console.log(confirmed);
      this.setState({ dailyInfections: confirmed });
    });

    coronaService.getAllByDistrict().then(confirmed => {
        console.log(confirmed);
        this.setState({ infectionsByDistrict: confirmed });
      });
  }

  render() {
    return (
      <div style={{ marginLeft: "15px", marginTop: "20px" }}>
        <Container fluid>
          <Row>
            <Col>
              <h5>Sairastuneiden kokonaismäärä päivittäin</h5>
              <SimpleGraph
                data={this.state.infectionsByDate}
                xDataKey={"date"}
                xDataName={"Päivämäärä"}
                yDataName={"Sairastuneiden määrä"}
              />
            </Col>
            <Col>
              <h5>Päivän aikana sairastuneet</h5>
              <SimpleGraph
                data={this.state.dailyInfections}
                xDataKey={"date"}
                xDataName={"Päivämäärä"}
                yDataName={"Sairastuneiden määrä"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Sairastuneiden kokonaismäärä päivittäin</h5>
              <PieChart
                data={this.state.infectionsByDistrict}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
