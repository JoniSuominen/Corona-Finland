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
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={this.props.data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.props.xDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name={this.props.xDataName}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#82ca9d"
          name={this.props.yDataName}
        />
      </LineChart>
    );
  }
}
