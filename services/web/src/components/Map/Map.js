import React, { Component } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import NavBar from './NavBar/NavBar.js';
import { withRouter, Switch, Route } from 'react-router-dom';
import SpotsList from './SpotsList/SpotsList';
import Login from '../Login/Login.js';
import AddSpot from '../Transaction/AddSpot/AddSpot';
import LocationList from '../UserInfo/Location/LocationList/LocationList';
import CarList from '../UserInfo/Car/CarList/CarList';
import ClaimSpotted from '../Transaction/ClaimSpotted/ClaimSpotted';
import ClaimReserved from '../Transaction/ClaimReserved/ClaimReserved';
import { AUTH_TOKEN } from '../../constants';
import { initializeMap } from '../../utilities/mapHelper';

mapboxgl.accessToken = 'pk.eyJ1IjoidHJlbnRnb2luZyIsImEiOiJjam11bDQwdGwyeWZ5M3FqcGFuaHRxd3Q2In0.UyaQAvC0nx08Ih7-vq3wag';

class Map extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      lng: -73.9824,
      lat: 40.7426,
      zoom: 11.39,
      listRedirect: false,
      listSpotLng: 0,
      listSpotLat: 0,
      modalShow: true,
      spotType: 0,
      spotId: '',
      listingId: '',
      spotStartTime: '',
      spotEndTime: '',
      map: {},
      loggedIn: false
    };
    this.claimSpot = this.claimSpot.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  };

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    let map = initializeMap(lat, lng, zoom, this.mapContainer, this.moveHandler, this.clickHandler);
    // const map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: 'mapbox://styles/trentgoing/cjn3k897e04832ro1m1uospzy',
    //   center: [lng, lat],
    //   zoom
    // });

    // map.on('move', () => {
    //   const { lng, lat } = map.getCenter();
    //   this.setState({
    //     lng: lng.toFixed(4),
    //     lat: lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2)
    //   });
    // });

    // map.loadImage('/parking-meter-blue.png', function(error, image) {
    //     if (error) console.log(error);
    //     map.addImage('blue-meter', image);
    // })

    // map.loadImage('/parking-meter-green.png', function(error, image) {
    //   if (error) console.log(error);
    //   map.addImage('green-meter', image);
    // })

    // map.on('click', 'places', (e) => {
    //   var coordinates = e.features[0].geometry.coordinates.slice();
    //   var description = e.features[0].properties.description;
    //   // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, 
    //   // the popup appears over the copy being pointed to.
    //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //   }

    //   new mapboxgl.Popup()
    //       .setLngLat(coordinates)
    //       .setHTML(description)
    //       .addTo(map);
    // });

    // map.on('click', 'point', (e) => {
    //   this.setState({
    //     listSpotLat: e.lngLat.lat,
    //     listSpotLng: e.lngLat.lng
    //   })
    //   this.props.history.push({
    //     pathname: '/addSpot',
    //     state: { lng: this.state.listSpotLng, lat: this.state.listSpotLat }
    //   });
    // });

    // // Change the cursor to a pointer when the mouse is over the places layer.
    // map.on('mouseenter', 'places', () => {
    //   map.getCanvas().style.cursor = 'pointer';
    // });

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'places', () => {
    //   map.getCanvas().style.cursor = '';
    // });

    // map.on('mouseenter', 'point', () => {
    //   map.setPaintProperty('point', 'circle-color', '#3bb2d0');
    //   map.getCanvas().style.cursor = 'pointer';
    // });

    // map.on('mouseleave', 'point', () => {
    //   map.setPaintProperty('point', 'circle-color', '#3887be');
    //   map.getCanvas().style.cursor = '';
    // });

    // map.on('click', (e) =>  {
    //   if (this.state.zoom < 17) {
    //     let newZoom = parseInt(this.state.zoom, 10) + 2;
    //     map.flyTo({center: e.lngLat, zoom: newZoom});
    //     this.setState({
    //       zoom: newZoom
    //     })
    //   }
    //   else {
    //     if (map.getSource('point')) {
    //       let geojson = {
    //         "type": "FeatureCollection",
    //         "features": [{
    //             "type": "Feature",
    //             "geometry": {
    //                 "type": "Point",
    //                 "coordinates": [e.lngLat.lng, e.lngLat.lat]
    //             }
    //         }]
    //       };
    //       map.getSource('point').setData(geojson);
    //     }
    //     else {
    //       let geojson = {
    //         "type": "FeatureCollection",
    //         "features": [{
    //             "type": "Feature",
    //             "geometry": {
    //                 "type": "Point",
    //                 "coordinates": [e.lngLat.lng, e.lngLat.lat]
    //             }
    //         }]
    //       };
    //       map.addSource('point', {
    //         "type": "geojson",
    //         "data": geojson
    //       });

    //       map.addLayer({
    //         "id": "point",
    //         "type": "circle",
    //         "source": "point",
    //         "paint": {
    //             "circle-radius": 10,
    //             "circle-color": "#3887be"
    //         }
    //       });
    //     }
    //   }
    //   // map.flyTo({center: e.lngLat});
    // });
    
    var trackUser = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    document.getElementById('track-user').appendChild(trackUser.onAdd(map));

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      country: 'us',
      bbox: [-74.2299, 40.6778, -73.6806, 40.8789]
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    this.setState({
      map: map
    });
  };

  moveHandler(lng, lat, zoom) {
    this.setState({
      lng: lng,
      lat: lat,
      zoom: zoom
    });
  }

  clickHandler(lat, lng) {
    this.setState({
      listSpotLat: lat,
      listSpotLng: lng
    })
    this.props.history.push({
      pathname: '/addSpot',
      state: { lng: this.state.listSpotLng, lat: this.state.listSpotLat }
    });
  }

  changeLogin() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      this.setState({
        loggedIn: true
      })
    }
  };

  toggleLogin() {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  };

  claimSpot(spot) {
    this.setState({
      listingId: spot.listing.id,
      spotType: spot.type,
      spotId: spot.id,
      spotStartTime: spot.start_time,
      spotEndTime: spot.end_time
    });

    if (spot.type === 1) {
      this.props.history.push({
        pathname: '/claimReserved',
        state: { 
          spotId: this.state.spotId, 
          listingId: this.state.listingId, 
          start_time: this.state.spotStartTime, 
          end_time: this.state.spotEndTime
        }
      });
    } else if (spot.type === 2) {
      this.props.history.push({
        pathname: '/claimSpotted',
        state: { 
          spotId: this.state.spotId, 
          listingId: this.state.listingId, 
          start_time: this.state.spotStartTime
        }
      });
    } else {
      console.log('Error, no spot Type');
    }
  };

  _getLatLonToRender = (data) => {
    // const isNewPage = this.props.location.pathname.includes('new')
    // if (isNewPage) {
    //   return data.feed.links
    // }
    // const rankedLinks = data.feed.links.slice()
    // rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
    // return rankedLinks
  };

  render() {
    return (
      <React.Fragment>
      <div id="map">
        <div ref={el => this.mapContainer = el} id="map-container" />
        <div id="geocoder" className="geocoder"></div>
        <div id="track-user" className="track-user"></div>
        <NavBar map={this.state.map} loggedIn={this.state.loggedIn} changeLogin={this.changeLogin} toggleLogin={this.toggleLogin}/>
        <SpotsList map={this.state.map} claimSpot={this.claimSpot}/>
      </div>
        <Switch>
          <Route exact path="/addSpot" component={AddSpot} />
          <Route exact path="/login" render={() => {
            return <Login toggleLogin={this.toggleLogin}/>
          }}/>
          <Route exact path="/spots" component={SpotsList} />
          <Route exact path="/locations" component={LocationList} />
          <Route exact path="/cars" component={CarList} />
          <Route exact path="/claimSpotted" component={ClaimSpotted} />
          <Route exact path="/claimReserved" component={ClaimReserved} />
        </Switch>
      </React.Fragment>
    ); 
  };
};

export default withRouter(Map);
