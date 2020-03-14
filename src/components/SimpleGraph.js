import React, { PureComponent } from "react";
import coronaService from "../services/corona";
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
    infections: null
  };
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";

  componentDidMount() {
    coronaService.getAllByDate().then(confirmed => {
      console.log(confirmed);
      this.setState({ infections: confirmed });
    });
  }

  render() {

    return (
      <LineChart
        width={500}
        height={300}
        data={this.state.infections}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
