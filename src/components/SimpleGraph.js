import React, { PureComponent } from "react";
import coronaService from "../services/corona";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default class SimpleGraph extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ResponsiveContainer height='60%' width={this.props.width} aspect={4.0/3.0}>
      <LineChart
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
          dataKey="count"
          stroke="#82ca9d"
          name={this.props.yDataName}
        />
      </LineChart>
      </ResponsiveContainer>
    );
  }
}
