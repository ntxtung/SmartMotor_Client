import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ButtonGroup, Button, Text } from 'react-native-elements'
import { MQTT_TOPIC_ALARM, MQTT_TOPIC_UNLOCK, MQTT_TOPIC_LOCK } from 'react-native-dotenv'

export default class ControlPane extends React.Component {
  onAlarm = () => {
    this.props.mqttClient.publish(MQTT_TOPIC_ALARM, '1')
    console.log('Alarm')
  }
  render() {
    const button1 = () => <Text onPress={this.onAlarm}>Alarm 1</Text>
    const button2 = () => <Text onPress={this.onAlarm}>Alarm 2</Text>
    const buttons =[{element: button1}, {element: button2}]
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
