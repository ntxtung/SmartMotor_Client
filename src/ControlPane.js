import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ButtonGroup, Button, Text } from 'react-native-elements'
import { MQTT_TOPIC_ALARM, MQTT_TOPIC_UNLOCK, MQTT_TOPIC_LOCK } from 'react-native-dotenv'

export default class ControlPane extends React.Component {
  onLock = () => {
    this.props.mqttClient.publish(MQTT_TOPIC_LOCK, '1')
    console.log('Lock')
  }
  onUnlock = () => {
    this.props.mqttClient.publish(MQTT_TOPIC_UNLOCK, '1')
    console.log('Unlock')
  }
  onAlarm = () => {
    this.props.mqttClient.publish(MQTT_TOPIC_ALARM, '1')
    console.log('Alarm')
  }
  render() {
    // const component1 = () => <Text onPress={this.onLock}>Lock</Text>
    const component2 = () => <Text onPress={this.onAlarm}>Alarm</Text>
    // const component3 = () => <Text onPress={this.onUnlock}>Unlock</Text>
    // const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    const buttons =[{element: component2}]
    return (
        <View style={styles.controlContainer}>
            <ButtonGroup 
              buttons={buttons}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  controlContainer: {

  }
});
