import React from 'react'
import coronaService from '../services/corona'
import { Map as LeafletMap, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import DataMarker from './DataMarker'
var data = require('../data/districtmap.json') 
var geojson = require('../data/kuntarajat.json')


class Map extends React.Component {

  state = {
    render: true,
    infections: null,
    deaths: null
  }

  componentDidMount() {
    coronaService.getAll().then(confirmed => {
      console.log(confirmed)
      this.setState({infections : this.formatInfectionData(confirmed)})
    })
  }
  
  formatInfectionData = (data) => {
    var newData = {}
    data.confirmed.map(infection => {
      if (newData[infection['healthCareDistrict']]) {
        var count = newData[infection['healthCareDistrict']].infections
        var newCount = parseInt(count);
        newCount++;
        newData[infection['healthCareDistrict']].infections = newCount;
      } else {
        const newDistrict = {
          infections: 1,
          deaths: 0,
          recovered: 0
        }
        newData[infection['healthCareDistrict']] = newDistrict
      }
    })

    data.deaths.map(infection => {
      if (newData[infection['healthCareDistrict']]) {
        var count = newData[infection['healthCareDistrict']].deaths
        var newCount = parseInt(count);
        newCount++;
        newData[infection['healthCareDistrict']].deaths = newCount;
      } else {
        const newDistrict = {
          infections: 0,
          deaths: 1,
          recovered: 0
        }
        newData[infection['healthCareDistrict']] = newDistrict
      }
    })

    data.recovered.map(infection => {
      if (newData[infection['healthCareDistrict']]) {
        var count = newData[infection['healthCareDistrict']].recovered
        var newCount = parseInt(count);
        newCount++;
        newData[infection['healthCareDistrict']].recovered = newCount;
      } else {
        const newDistrict = {
          infections: 0,
          deaths: 0,
          recovered: 1
        }
        newData[infection['healthCareDistrict']] = newDistrict
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
        
        {this.state.infections != null  ? Object.keys(this.state.infections).map(function(key) {
          return <DataMarker x ={data[key].x} y = {data[key].y} name={key} infections={all[key].infections} deaths={all[key].deaths} recovered={all[key].recovered}/>
      }): console.log("hei")}
      
         <GeoJSON key={`geojson-01`} data={geojson} />
      </LeafletMap>
    );
  }
}

export default Map

/*
        {this.state.infections != null  ? Object.keys(this.state.infections).map(function(key) {
          return <DataMarker x ={data[key].x} y = {data[key].y} name={key} infections={all[key]}/>
      }): console.log("hei")}
      */