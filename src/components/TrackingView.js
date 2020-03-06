import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import {connect} from 'react-redux'

import {LANG_LATITUDE, LANG_LONGITUDE, LANG_BATTERY, LANG_SAT_TRACKED, LANG_SAT_TOTAL, 
        DEFAULT_LATITUDE, DEFAULT_LONGITUDE, 
        LANG_DEVICE_01, LANG_DEVICE_02} from '../constants'

import {changeRegion} from '../actions'

class TrackingView extends React.Component {
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
        name: LANG_DEVICE_01,
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE
      },
      deviceData02: {
        name: LANG_DEVICE_02,
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

  render() {
    return (
      <MapView
        style={styles.mapViewStyle}
        region={this.props.region}
        onRegionChangeComplete={(region) => this.props.changeRegion(region)}
      > 
        <Marker
          coordinate={this.state.deviceData01}
        >
          <Callout>
            <View>
              <Text style={{fontWeight: 'bold'}}>{this.state.deviceData01.name}</Text>
              <Text>{LANG_LATITUDE}: {this.state.deviceData01.latitude || ''}</Text>
              <Text>{LANG_LONGITUDE}: {this.state.deviceData01.longitude || ''}</Text>
              <Text>{LANG_BATTERY}: {this.state.deviceData01.batt || '?'}</Text>
              <Text>{LANG_SAT_TRACKED}: {this.state.deviceData01.satelitesTracked || 0}</Text>
              <Text>{LANG_SAT_TOTAL}: {this.state.deviceData01.gpsSatesTotal || 0}</Text>
            </View>
          </Callout>
        </Marker>
        <Marker
          coordinate={this.state.deviceData02}
          pinColor={'#0000FF'}
        >
          <Callout>
            <View>
              <Text style={{fontWeight: 'bold'}}>{this.state.deviceData02.name}</Text>
              <Text>{LANG_LATITUDE}: {this.state.deviceData02.latitude || ''}</Text>
              <Text>{LANG_LONGITUDE}: {this.state.deviceData02.longitude || ''}</Text>
              <Text>{LANG_BATTERY}: {this.state.deviceData02.batt || '?'}</Text>
              <Text>{LANG_SAT_TRACKED}: {this.state.deviceData02.satelitesTracked || 0}</Text>
              <Text>{LANG_SAT_TOTAL}: {this.state.deviceData02.gpsSatesTotal || 0}</Text>
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

const mapStateToProps = (state) => {
  return {region: state.mapViewReducer.region};
}

export default connect(mapStateToProps, {changeRegion})(TrackingView)