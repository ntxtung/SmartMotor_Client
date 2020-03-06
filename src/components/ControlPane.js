import React from 'react';
import { StyleSheet, View, TouchableOpacity , Text } from 'react-native';
import {connect} from 'react-redux'

import { MQTT_TOPIC_ALARM_D01, MQTT_TOPIC_ALARM_D02, LANG_ALARM_BTN1, LANG_ALARM_BTN2, LANG_FIND_BTN1, LANG_FIND_BTN2 } from '../constants'

import {changeRegion} from '../actions'

class ControlPane extends React.Component {
  onAlarm1 = () => {

  }

  onFind1 = () => {

  }


  render() {
    // const statusColor = this.props.mqttStatus.code === 1 ? 'green' : 'red'
    const statusColor = 'yellow'
    return (
        <View style={styles.controlContainer}>
          <View style={{...styles.statusGroup, backgroundColor: statusColor}}>
            <Text style={styles.fullButtonText}>On Maintaining</Text>
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

const mapStateToProps = (state) => {
  return {
    // region: state.mapViewReducer.region
  };
}

export default connect(mapStateToProps, {changeRegion})(ControlPane)