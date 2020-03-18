import React from "react";
import coronaService from "../services/corona";
import {
  Map as LeafletMap,
  TileLayer
} from "react-leaflet";
import Choropleth from "react-leaflet-choropleth";
var geojson = require("../data/shpNew.json");

const style = {
  fillColor: "#aaff80",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.6
};


const bounds = [[71.035597,18.032228],
                [58.269625,33.105469]]

class Map extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    render: true,
    infections: null,
    deaths: null
  };

  componentDidMount() {
    coronaService.getAllInfection().then(confirmed => {
      Object.keys(confirmed).forEach(function(key) {
        var idx = geojson.features.findIndex(g =>
          g.properties.name == key
        );
        if (idx !== -1) {
          geojson.features[idx].properties.count = confirmed[key].infections
        }
      });

      this.setState({ infections: confirmed });
    });
  }

  render() {
    var keys = null;
    if (this.state.infections != null) {
      keys = Object.keys(this.state.infections);
    }
    const all = this.state.infections;
    return (
      <LeafletMap
        center={[65.0, 24.0]}
        zoom={6}
        minZoom ={6}
        maxZoom={10}
        height="60%"
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={false}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        maxBounds = {bounds}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Choropleth
          data={geojson}
          valueProperty={feature => Math.log1p(feature.properties.count)}
          scale={["#A8EB12","#D20F23" ]}
          steps={10}
          mode="e"
          style={style}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(feature.properties.name)
            layer.on({click: this.props.onClick})
            }
          }
          visible = {(feature) => feature.properties.count > 0}
        >
        </Choropleth>
      </LeafletMap>
    );
  }
}

export default Map;
