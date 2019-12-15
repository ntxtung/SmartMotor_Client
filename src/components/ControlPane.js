import React from 'react';
import { StyleSheet, View, TouchableOpacity , Text } from 'react-native';

import { MQTT_TOPIC_ALARM_D01, MQTT_TOPIC_ALARM_D02, LANG_ALARM_BTN1, LANG_ALARM_BTN2, LANG_FIND_BTN1, LANG_FIND_BTN2 } from '../constants'

export default class ControlPane extends React.Component {
  onAlarm1 = () => {
    if (this.props.mqttClient) {
      this.props.mqttClient.publish(MQTT_TOPIC_ALARM_D01, '1')
    }
  }
  onAlarm2 = () => {
    if (this.props.mqttClient) {
      this.props.mqttClient.publish(MQTT_TOPIC_ALARM_D02, '1')
    }
  }
  onFind1 = () => {
    if (this.props.moveRegionTo) {
      this.props.moveRegionTo('D1')
    }
  }
  
  onFind2 = () => {
    if (this.props.moveRegionTo) {
      this.props.moveRegionTo('D2')
    }
  }

  render() {
    const statusColor = this.props.mqttStatus.code === 1 ? 'green' : 'red'
    return (
        <View style={styles.controlContainer}>
          <View style={{...styles.statusGroup, backgroundColor: statusColor}}>
            <Text style={styles.fullButtonText}>{this.props.mqttStatus.text}</Text>
          </View>

          <View style={styles.buttonControlGroup}>
            <TouchableOpacity 
              style={styles.fullWidthButton}
              onPress={this.onFind1}
              >
                <Text style={styles.fullButtonText}>
                  {LANG_FIND_BTN1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.fullWidthButton}
              onPress={this.onFind2}
              >
                <Text style={styles.fullButtonText}>
                  {LANG_FIND_BTN2}
                </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonControlGroup}>
            <TouchableOpacity 
              style={styles.fullWidthButton}
              onPress={this.onAlarm1}
              >
                <Text style={styles.fullButtonText}>
                  {LANG_ALARM_BTN1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.fullWidthButton}
              onPress={this.onAlarm2}
              >
                <Text style={styles.fullButtonText}>
                  {LANG_ALARM_BTN2}
                </Text>
            </TouchableOpacity>
          </View>
        </View>
    )
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
    alignItems: 'center'
  },
  buttonControlGroup: {
    flex: 2,
    flexDirection: 'row'
  },
  mqttStatus: {

  },
  fullWidthButton: {
    backgroundColor: '#111111',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
