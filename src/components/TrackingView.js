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
      initCoor: {
        lat: DEFAULT_LATITUDE,
        lon: DEFAULT_LONGITUDE
      }
    };
  }

  render() {
    const coordinate = {
      latitude: this.props.device ? this.props.device.lat : this.state.initCoor.lat,
      longitude: this.props.device ? this.props.device.lon : this.state.initCoor.lon
    }
    let marker;
    if (this.props.device) {
      marker = 
      <Marker coordinate={coordinate}>
          <Callout>
            <View>
              <Text style={{fontWeight: 'bold'}}>
                {LANG_DEVICE_NAME}
              </Text>
              <Text>
                {LANG_LATITUDE}: {this.props.device.lat || ''}
              </Text>
              <Text>
                {LANG_LONGITUDE}: {this.props.device.lon || ''}
              </Text>
              <Text>
                {LANG_BATTERY}: {this.props.device.batt || '?'}
              </Text>
              <Text>
                {LANG_SAT_TRACKED}:{' '}
                {this.props.device.satelitesTracked || 0}
              </Text>
              <Text>
                {LANG_SAT_TOTAL}: {this.props.device.gpsSatesTotal || 0}
              </Text>
            </View>
          </Callout>
        </Marker>
    }
    return (
      <MapView
        style={styles.mapViewStyle}
        region={this.props.region}
        onRegionChangeComplete={region => this.props.changeRegion(region)}>
        {marker}
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
  if (state.motorbikeReducer && state.mapViewReducer) {
    return {
      region: state.mapViewReducer.region,
      device: state.motorbikeReducer.device
    };
  } else {
    return {}
  }
};

export default connect(
  mapStateToProps,
  {changeRegion},
)(TrackingView);
