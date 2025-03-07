import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';

import {
  LANG_CONNECTED,
  LANG_DISCONNECTED,
  LANG_ALARM_BTN,
  LANG_FIND_BTN,
  LANG_LOCK_BTN,
  MQTT_TOPIC_ALARM,
  MQTT_TOPIC_LOCK,
} from '../constants';

import {changeRegion, mqttPublishMessage} from '../actions';

class ControlPane extends React.Component {
  onBuzz = () => {
    this.props.mqttPublishMessage(MQTT_TOPIC_ALARM, null)
  }

  onCenter = () => {
    let region = {...this.props.region}
    region.latitude = this.props.device.lat
    region.longitude = this.props.device.lon
    this.props.changeRegion(region)
  }

  onLockTrigger = () => {
    this.props.mqttPublishMessage(MQTT_TOPIC_LOCK, null)
  }

  render() {
    const mqttStatus =
      this.props.mqttStatus && this.props.mqttStatus.code === 1
        ? {color: 'green', text: LANG_CONNECTED}
        : {color: 'red', text: LANG_DISCONNECTED};
    return (
      <View style={styles.controlContainer}>
        <View
          style={{...styles.statusGroup, backgroundColor: mqttStatus.color}}>
          <Text style={styles.fullButtonText}>{mqttStatus.text}</Text>
        </View>

        <View style={styles.buttonControlGroup}>
          <TouchableOpacity
            style={styles.fullWidthButton}
            onPress={this.onCenter}>
            <Text style={styles.fullButtonText}>{LANG_FIND_BTN}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fullWidthButton}
            onPress={this.onBuzz}>
            <Text style={styles.fullButtonText}>{LANG_ALARM_BTN}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fullWidthButton}
            onPress={this.onLockTrigger}>
            <Text style={styles.fullButtonText}>{LANG_LOCK_BTN}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  controlContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  statusGroup: {
    flex: 1,
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
    alignItems: 'center',
  },
  buttonControlGroup: {
    flex: 2,
    flexDirection: 'row',
  },
  mqttStatus: {},
  fullWidthButton: {
    backgroundColor: '#111111',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  if (state.mqttClientReducer) {
    return {
      mqttStatus: state.mqttClientReducer.status,
      device: state.motorbikeReducer.device,
      region: state.mapViewReducer.region,
    };
  } else {
    return {};
  }
};

export default connect(
  mapStateToProps,
  {changeRegion, mqttPublishMessage},
)(ControlPane);
