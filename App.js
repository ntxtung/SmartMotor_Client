import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TrackingView from './src/TrackingView'
import ControlPane from './src/ControlPane'

import { NEED_ABOUT, LANG_ABOUT_APP, LANG_ABOUT_AUTHOR, LANG_CONNECTED, LANG_DISCONNECTED, MQTT_BROKER_HOST, MQTT_TOPIC_TRACKING_D01, MQTT_TOPIC_TRACKING_D02 } from './src/Constants'

import mqtt from 'mqtt/dist/mqtt'


export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mqttClient: null,
            mqttStatus: {
                text: LANG_DISCONNECTED,
                code: 0
            },
            deviceData01: null,
            deviceData02: null
        }
    }

    componentDidMount() {
        this.mqttConnectBroker()
    }

    componentWillUnmount() {
        this.mqttDisconnectedHandler()
    }

    mqttConnectBroker() {
        let mqttClient = mqtt.connect(MQTT_BROKER_HOST)

        mqttClient.on('connect', (connack) => {
            this.setMqttStatus(true)
            mqttClient.subscribe(MQTT_TOPIC_TRACKING_D01)
            mqttClient.subscribe(MQTT_TOPIC_TRACKING_D02)
        })

        mqttClient.on('message', (topic, message) => {
            let data = JSON.parse(message)
            switch (topic) {
                case MQTT_TOPIC_TRACKING_D01:
                    if (data.lat && data.lon) {
                        let newDeviceData01 = { ...this.state.deviceData01, latitude: data.lat, longitude: data.lon, ...data}
                        this.setState({ deviceData01: newDeviceData01 })
                        console.log("D01: ", newDeviceData01)
                    }
                    break;
                case MQTT_TOPIC_TRACKING_D02:
                    if (data.lat && data.lon) {
                        let newDeviceData02 = { ...this.state.deviceData02, latitude: data.lat, longitude: data.lon, ...data}
                        this.setState({ deviceData02: newDeviceData02 })
                        console.log("D02: ", newDeviceData02)
                    }
                    break;
                default:
                    break;
            }
        })

        mqttClient.on('close', () => {
            this.setMqttStatus(false)
        })

        this.setState({ mqttClient })
    }

    mqttDisconnectedHandler() {
        this.state.mqttClient.unsubscribe(MQTT_TOPIC_TRACKING_D01)
        this.state.mqttClient.unsubscribe(MQTT_TOPIC_TRACKING_D02)
        this.setMqttStatus(false)
    }

    setMqttStatus(status) {
        if (status === true) {
            this.setState({ mqttStatus: { text: LANG_CONNECTED, code: 1 } })
        } else {
            this.setState({ mqttStatus: { text: LANG_DISCONNECTED, code: 0 } })
        }
    }

    moveRegionTo = (device) => {
        if (device === 'D1' && this.state.deviceData01) {
            let newRegion = {latitude, longitude} = this.state.deviceData01
            this.setState({region: newRegion})
        } else if (device === 'D2' && this.state.deviceData02) {
            let newRegion = {latitude, longitude} = this.state.deviceData02
            this.setState({region: newRegion})
        }
    }

    aboutComponent = (
        <View style={styles.about}>
            <Text style={styles.aboutText}>
                {LANG_ABOUT_APP}
            </Text>
            <Text style={styles.aboutText}>
                {LANG_ABOUT_AUTHOR}
            </Text>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                {(NEED_ABOUT) ? this.aboutComponent : null}
                <View style={styles.trackingView}>
                    <TrackingView
                        deviceData01={this.state.deviceData01}
                        deviceData02={this.state.deviceData02}
                        region={this.state.region}
                    />
                </View>
                <View style={styles.controlPane}>
                    <ControlPane
                        mqttStatus={this.state.mqttStatus}
                        mqttClient={this.state.mqttClient}
                        moveRegionTo={this.moveRegionTo}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        flexDirection: 'column'
    },
    about: {
        flex: 0.8,
        alignItems: 'center',
        backgroundColor: '#1976d2'
    },
    aboutText: {
        fontWeight: 'bold',
        color: '#ffffff'
    },
    trackingView: {
        flex: 10,
        // backgroundColor: 'blue'
    },
    controlPane: {
        flex: 2,
        // backgroundColor: 'transparent',
    }
});
