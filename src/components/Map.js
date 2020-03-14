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
import Choropleth from "react-leaflet-choropleth";
var data = require("../data/districtmap.json");
var geojson = require("../data/shpNew.json");
const style = {
  fillColor: "#F28F3B",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.6
};

class Map extends React.Component {
  state = {
    render: true,
    infections: null,
    deaths: null
  };

  componentDidMount() {
    coronaService.getAllInfection().then(confirmed => {
      console.log(confirmed);
      Object.keys(confirmed).forEach(function(key) {
        var idx = geojson.features.findIndex(g =>
          g.properties.name == key
        );
        console.log(idx)
        if (idx !== -1) {
          geojson.features[idx].properties.count = confirmed[key].infections
        }
        console.log(geojson.features)
      });

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
        <Choropleth
          data={geojson}
          valueProperty={feature => Math.log1p(feature.properties.count)}
          scale={["#A8EB12","#D20F23" ]}
          steps={10}
          mode="e"
          style={style}
          onEachFeature={(feature, layer) =>
            layer.bindPopup(feature.properties.count)
          }
        >
          {this.state.infections != null
            ? Object.keys(this.state.infections).map(function(key) {
                console.log(key);
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
        </Choropleth>
      </LeafletMap>
    );
  }
}

export default Map;
