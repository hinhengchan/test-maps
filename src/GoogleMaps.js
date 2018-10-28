import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";
import common from './common';
import './GoogleMaps.css';

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legends: [],
      markers: [],
      bounds: {}
    }

    Geocode.setApiKey(common.googleApiKey);
    common.updateGoogleMaps = common.updateGoogleMaps.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }

  updateMarkers() {
    var bounds = new this.props.google.maps.LatLngBounds();
    var categories = [];

    if (common.data.length === common.locations.length) {
      var markers = common.locations.map((i) => {
        var key = i.lat.toString() + "," + i.lng.toString();
        var location = Object.assign({}, i);
        delete location.category;

        if (categories.indexOf(i.category) < 0) {
          categories.push(i.category);
        }

        var categoryIndex = categories.indexOf(i.category).toString();

        bounds.extend(location);

        return (
          <Marker
            key={key}
            position={location}
            label={categoryIndex} />
        )
      });

      var legends = categories.map((i, index) => {
        return (
          <p key={index}>{index}: {i}</p>
        )
      });

      this.setState({
        legends: legends,
        markers: markers,
        bounds: bounds
      })
    }
  }

  render() {
    var geocoder = async (i, address) => {
      await Geocode.fromAddress(address).then(
        response => {
          var data = response.results[0].geometry.location;
          data.category = common.data[i][categoryIndex];
          
          common.locations.push(data);
          this.updateMarkers();
        },
        error => {
          console.error(error);
        }
      );
    }

    for (var i = 0; i < common.data.length; i++) {
      var addressIndex = Object.values(common.columnMatch).indexOf('address');
      var cityIndex = Object.values(common.columnMatch).indexOf('city');
      var stateIndex = Object.values(common.columnMatch).indexOf('state');
      var zipcodeIndex = Object.values(common.columnMatch).indexOf('zipcode');
      var categoryIndex = Object.values(common.columnMatch).indexOf('category');

      var address = common.data[i][addressIndex] + "," + common.data[i][cityIndex] + "," + common.data[i][stateIndex] + "," + common.data[i][zipcodeIndex];
      geocoder(i, address);
    }

    return (
      <div>
        <Map 
          google={this.props.google}
          style={{
            width: '88%',
            height: '80%'
          }}
          initialCenter={{
            lat: 40.109824,
            lng: -99.604229
          }}
          zoom={5}
          bounds={this.state.bounds}>
          {this.state.markers}
        </Map>
        <div className="legends">
          <p><b>Legends</b></p>
          {this.state.legends}
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (common.googleApiKey)
})(GoogleMaps);
