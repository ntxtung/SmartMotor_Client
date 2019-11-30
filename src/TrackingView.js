import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';

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
      this.setState({deviceData01: {...this.state.deviceData01, ...this.props.deviceData01}})
    }
    if (prevProps.deviceData02 != this.props.deviceData02) {
      this.setState({deviceData02: {...this.state.deviceData02, ...this.props.deviceData02}})
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
        >
          <Callout>
            <View>
              <Text style={{fontWeight: 'bold'}}>Device 01</Text>
              <Text>Latitude: {this.state.deviceData01.latitude || ''}</Text>
              <Text>Longitude: {this.state.deviceData01.longitude || ''}</Text>
              <Text>Battery: {this.state.deviceData01.batt || '?'}</Text>
              <Text>Satelites Tracked: {this.state.deviceData01.satelitesTracked || 0}</Text>
              <Text>Gps Sates Total: {this.state.deviceData01.gpsSatesTotal || 0}</Text>
            </View>
          </Callout>
        </Marker>
        <Marker
          coordinate={this.state.deviceData02}
          pinColor={'#0000FF'}
        >
          <Callout>
            <View>
              <Text style={{fontWeight: 'bold'}}>Device 02</Text>
              <Text>Latitude: {this.state.deviceData02.latitude || ''}</Text>
              <Text>Longitude: {this.state.deviceData02.longitude || ''}</Text>
              <Text>Battery: {this.state.deviceData02.batt || '?'}</Text>
              <Text>Satelites Tracked: {this.state.deviceData02.satelitesTracked || 0}</Text>
              <Text>Gps Sates Total: {this.state.deviceData02.gpsSatesTotal || 0}</Text>
            </View>
          </Callout>
        </Marker>
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
