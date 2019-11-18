import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TrackingView from './src/TrackingView'
import ControlPane from './src/ControlPane'

import { MQTT_BROKER_HOST, MQTT_BROKER_WS_PORT, MQTT_TOPIC_TRACKING } from 'react-native-dotenv'
import mqtt from 'mqtt/dist/mqtt'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    var mqttClient = mqtt.connect(MQTT_BROKER_HOST, {port: MQTT_BROKER_WS_PORT})


    mqttClient.on('connect', () => {
      this.setState({mqttStatus: 'Connected'})
      mqttClient.subscribe(MQTT_TOPIC_TRACKING)
    })
    
    mqttClient.on('message', (topic, message) => {
      let data = JSON.parse(message)
      switch (topic){
        case MQTT_TOPIC_TRACKING:
          if (data.coordinate) {
            this.setState({
              coordinate: data.coordinate
            })
          }
          break;
        default:
          break;
      }
    })

    this.state = {
      mqttClient: mqttClient
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
          <TrackingView 
            style={styles.trackingView}
            text="Hello"
            coordinate={this.state.coordinate} 
          />
          <ControlPane 
            style={styles.controlPane}
            mqttClient={this.state.mqttClient}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  trackingView: {
    flex: 9,
    flexGrow: 9,
    flexShrink: 1,
  },
  controlPane: {
    flex: 2,
    flexGrow: 2,
    flexShrink: 1,
  }
});
