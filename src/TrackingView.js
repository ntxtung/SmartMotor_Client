import React from 'react';
import { StyleSheet, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const DEFAULT_LATITUDE = 11.906930
const DEFAULT_LONGITUDE = 109.146176

export default class TrackingView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      deviceData01: {
        name: "Device 01",
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE
      },
      deviceData02: {
        name: "Device 02",
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deviceData01 != this.props.deviceData01) {
      let {longitude, latitude} = this.props.deviceData01
      let coorText = 'Longitude: ' + longitude.toFixed(7) + ' - Latitude: ' + latitude.toFixed(7)
      this.setState({deviceData01: {...this.state.deviceData01, ...this.props.deviceData01, coorText}})
    }
    if (prevProps.deviceData02 != this.props.deviceData02) {
      let {longitude, latitude} = this.props.deviceData02
      let coorText = 'Longitude: ' + longitude.toFixed(7) + ' - Latitude: ' + latitude.toFixed(7)
      this.setState({deviceData02: {...this.state.deviceData02, ...this.props.deviceData02, coorText}})
    }
    if (this.props.region && prevProps.region !== this.props.region) {
      let {latitude, longitude} = this.props.region
      if (latitude && longitude) {
        this.setState({region: {...this.state.region, latitude, longitude}})
      }
    }
  }

  onRegionChange = (region) => {
    this.setState({ region: region })
  }

  render() {
    return (
      <MapView
        style={styles.mapViewStyle}
        region={this.state.region}
        onRegionChangeComplete={this.onRegionChange}
      > 
        <Marker
          coordinate={this.state.deviceData01}
          title={this.state.deviceData01.name}
          description={this.state.deviceData01.coorText}
        />
        <Marker
          coordinate={this.state.deviceData02}
          title={this.state.deviceData02.name}
          description={this.state.deviceData02.coorText}
          // pinColor={'#00FF00'}
        />
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  mapViewStyle: {
    flex: 1,
    // height: 500
  }
});
