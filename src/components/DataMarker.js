import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

class DataMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("XDDDD");
    return (
      <Marker position={[this.props.x, this.props.y]}>
        <Popup>
          <div>{this.props.name}</div>
          <div>Tartuntoja: {this.props.infections}</div>
        </Popup>
      </Marker>
    );
  }
}
export default DataMarker;
