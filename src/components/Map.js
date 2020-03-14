import React from "react";
import coronaService from "../services/corona";
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  GeoJSON
} from "react-leaflet";
import DataMarker from "./DataMarker";
var data = require("../data/districtmap.json");
var geojson = require("../data/shp.json");

class Map extends React.Component {
  state = {
    render: true,
    infections: null,
    deaths: null
  };

  componentDidMount() {
    coronaService.getAllInfection().then(confirmed => {
      console.log(confirmed);
      this.setState({ infections: confirmed });
    });
  }

  render() {
    console.log(this.state.infections);
    var keys = null;
    if (this.state.infections != null) {
      keys = Object.keys(this.state.infections);
    }
    console.log(keys);
    const all = this.state.infections;
    return (
      <LeafletMap
        center={[61.5048382, 23.8114824]}
        zoom={7}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        {this.state.infections != null
          ? Object.keys(this.state.infections).map(function(key) {
              return (
                <DataMarker
                  x={data[key].x}
                  y={data[key].y}
                  name={key}
                  infections={all[key].infections}
                  deaths={all[key].deaths}
                  recovered={all[key].recovered}
                />
              );
            })
          : console.log("hei")}

        <GeoJSON key={`geojson-01`} data={geojson} />
      </LeafletMap>
    );
  }
}

export default Map;
