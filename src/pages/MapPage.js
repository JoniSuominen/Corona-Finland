import React from "react";
import coronaService from "../services/corona";
import Map from "../components/Map";

var data = require("../data/districtmap.json");
var geojson = require("../data/shpNew.json");

const bounds = [
  [71.035597, 18.032228],
  [59.269625, 33.105469]
];

class MapPage extends React.Component {
  state = {
    render: true,
    infections: null,
    deaths: null
  };

  componentDidMount() {
    coronaService.getAllInfection().then(confirmed => {
      this.setState({ infections: confirmed });
    });
  }

  render() {
    return <Map></Map>;
  }
}

export default MapPage;
