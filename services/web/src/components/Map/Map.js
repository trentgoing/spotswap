import React, { Component } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import NavBar from '../NavBar/NavBar.js';

mapboxgl.accessToken = 'pk.eyJ1IjoidHJlbnRnb2luZyIsImEiOiJjam11bDQwdGwyeWZ5M3FqcGFuaHRxd3Q2In0.UyaQAvC0nx08Ih7-vq3wag';
// console.log(process.env.REACT_APP_MAPBOX_API_KEY);

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      lng: -73.9824,
      lat: 40.7426,
      zoom: 11.39
    };
  }

  

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('click', 'places', function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
    });

    map.on('click', 'point', function (e) {
      alert("YO YOU WANNA ADD THIS SPOT?")
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'point', function() {
      map.setPaintProperty('point', 'circle-color', '#3bb2d0');
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'point', function() {
      map.setPaintProperty('point', 'circle-color', '#3887be');
      map.getCanvas().style.cursor = '';
    });

    map.on('click', (e) =>  {
      if (this.state.zoom < 17) {
        let newZoom = parseInt(this.state.zoom, 10) + 2;
        map.flyTo({center: e.lngLat, zoom: newZoom});
        this.setState({
          zoom: newZoom
        })
      } else {
        console.log("Need to place a marker on: " + e.lngLat);
        if(map.getSource('point')) {
          let geojson = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [e.lngLat.lng, e.lngLat.lat]
                }
            }]
          };
          map.getSource('point').setData(geojson);
        } else {
          let geojson = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [e.lngLat.lng, e.lngLat.lat]
                }
            }]
          };
  
          map.addSource('point', {
            "type": "geojson",
            "data": geojson
          });
  
          map.addLayer({
            "id": "point",
            "type": "circle",
            "source": "point",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#3887be"
            }
          });
        }
  
      }
      // map.flyTo({center: e.lngLat});
    });

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      country: 'us',
      bbox: [-74.2299, 40.6778, -73.6806, 40.8789],
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  }

  _getLatLonToRender = data => {
    const isNewPage = this.props.location.pathname.includes('new')
    // if (isNewPage) {
    //   return data.feed.links
    // }
    // const rankedLinks = data.feed.links.slice()
    // rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
    // return rankedLinks
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div id="map">
        <div id="location-describe" className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} id="map-container" />
        <div id='geocoder' className='geocoder'></div>
        <NavBar map={this.state.map} user_id={this.props.user_id} />
      </div>
    ); 
  }
}

export default Map;
