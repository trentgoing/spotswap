import React, { Component } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
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
import { Container, Navbar, Nav } from 'react-bootstrap';

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
      loggedIn: false,
      map: {}
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
    
    var trackUser = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map.on('load', () => {
      trackUser.trigger();
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

    this.changeLogin();
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
    if (this.state.loggedIn) {
      return (
        <React.Fragment>
        <div id="map">
          <div ref={el => this.mapContainer = el} id="map-container" />
          <div id="track-user" className="track-user"></div>
          <Container>
          <Navbar bg="dark" variant="dark" expand="xs">
            <Navbar.Brand><img src="/favicon-256.png" width="30" height="30" alt="swapspot"/></Navbar.Brand>
            <div id="geocoder" className="geocoder"></div>
            <Nav.Link href="/profilePage">Profile</Nav.Link>
              <Nav.Link href="/historyPage">History</Nav.Link>
              <Nav.Link onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    this.toggleLogin();
                  }}
              >Logout</Nav.Link>
          </Navbar>
          </Container>
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
      )
    }
    else {
      return (
      <React.Fragment>
        <div id="map">
          <div ref={el => this.mapContainer = el} id="map-container" />
          <div id="track-user" className="track-user"></div>
          <Container>
            <Navbar bg="dark" variant="dark" expand="xs">
              <Navbar.Brand><img src="/favicon-256.png" width="30" height="30" alt=""/></Navbar.Brand>
              <div id="geocoder" className="geocoder"></div>
              <Nav.Link href="/login">Login</Nav.Link>
            </Navbar>
          </Container>
          <SpotsList map={this.state.map} claimSpot={this.claimSpot}/>
        </div>
        <Switch>
            <Route exact path="/login" render={() => {
              return <Login toggleLogin={this.toggleLogin}/>
            }}/>
          </Switch>
        </React.Fragment>
      )
    }
  };
};

export default withRouter(Map);
