import React from 'react'
import coronaService from '../services/corona'
import { Map as LeafletMap, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import DataMarker from './DataMarker'
var data = require('../data/districtmap.json') 
var geojson = require('../data/kuntarajat.json')


class Map extends React.Component {

  state = {
    render: true,
    infections: null
  }

  componentDidMount() {
    coronaService.getAll().then(confirmed => {
      this.setState({infections : this.formatData(confirmed)})
    })
  }
  
  formatData = (data) => {
    var newData = {}
    data.confirmed.map(infection => {
      if (newData[infection['healthCareDistrict']]) {
        var count = newData[infection['healthCareDistrict']]
        var newCount = parseInt(count);
        newCount++;
        newData[infection['healthCareDistrict']] = newCount;
      } else {
        newData[infection['healthCareDistrict']] = 1;
      }
    })

    return newData;
  }

    render() {

      console.log(this.state.infections)
      var keys = null;
      if (this.state.infections != null) {
       keys = Object.keys(this.state.infections);
      }
      console.log(keys)
      const all = this.state.infections
    return (
      <LeafletMap
        center={[61.5048382,
        23.8114824]}
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
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
         <GeoJSON key={`geojson-01`} data={geojson} />
      {this.state.infections != null  ? Object.keys(this.state.infections).map(function(key) {
          return <DataMarker x ={data[key].x} y = {data[key].y} name={key} infections={all[key]}/>
      }): console.log("hei")}
      </LeafletMap>
    );
  }
}

export default Map