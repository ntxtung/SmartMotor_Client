import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import MapView, {Marker, Callout} from 'react-native-maps';
import {connect} from 'react-redux';

import {
  LANG_LATITUDE,
  LANG_LONGITUDE,
  LANG_BATTERY,
  LANG_SAT_TRACKED,
  LANG_SAT_TOTAL,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  LANG_DEVICE_NAME,
} from '../constants';

import {changeRegion} from '../actions';

class TrackingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      deviceData01: {
        name: LANG_DEVICE_NAME,
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deviceData01 != this.props.deviceData01) {
      this.setState({
        deviceData01: {...this.state.deviceData01, ...this.props.deviceData01},
      });
    }
    if (this.props.region && prevProps.region !== this.props.region) {
      let {latitude, longitude} = this.props.region;
      if (latitude && longitude) {
        this.setState({region: {...this.state.region, latitude, longitude}});
      }
    }
  }

  render() {
    return (
      <MapView
        style={styles.mapViewStyle}
        region={this.props.region}
        onRegionChangeComplete={region => this.props.changeRegion(region)}>
        <Marker coordinate={this.state.deviceData01}>
          <Callout>
            <View>
              <Text style={{fontWeight: 'bold'}}>
                {this.state.deviceData01.name}
              </Text>
              <Text>
                {LANG_LATITUDE}: {this.state.deviceData01.latitude || ''}
              </Text>
              <Text>
                {LANG_LONGITUDE}: {this.state.deviceData01.longitude || ''}
              </Text>
              <Text>
                {LANG_BATTERY}: {this.state.deviceData01.batt || '?'}
              </Text>
              <Text>
                {LANG_SAT_TRACKED}:{' '}
                {this.state.deviceData01.satelitesTracked || 0}
              </Text>
              <Text>
                {LANG_SAT_TOTAL}: {this.state.deviceData01.gpsSatesTotal || 0}
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapViewStyle: {
    flex: 1,
    // height: 500
  },
});

const mapStateToProps = state => {
  return {
    region: state.mapViewReducer.region
  };
};

export default connect(
  mapStateToProps,
  {changeRegion},
)(TrackingView);
