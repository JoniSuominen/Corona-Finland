import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Tooltip } from "react-leaflet";

class DataMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Marker position={[this.props.x, this.props.y]} >
        <Tooltip permanent  opacity={1}> 
          <div>{this.props.name}</div>
          <div>Tartuntoja: {this.props.infections}</div>
          <div>Kuolleita: {this.props.deaths}</div>
          <div>Parantuneita: {this.props.recovered}</div>
          </Tooltip>
      </Marker>
    );
  }
}
export default DataMarker;
