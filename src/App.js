import React from 'react';
import mqtt from 'mqtt/dist/mqtt'
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux'

import { NEED_ABOUT, LANG_ABOUT_APP, LANG_ABOUT_AUTHOR, LANG_CONNECTED, LANG_DISCONNECTED, MQTT_BROKER_HOST, MQTT_TOPIC_TRACKING_D01, MQTT_TOPIC_TRACKING_D02 } from './constants'

import TrackingView from './components/TrackingView'
import ControlPane from './components/ControlPane'

import { mqttConnectionInit } from './actions'


class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.mqttConnectionInit()
    }

    componentWillUnmount() {
    }

    setMqttStatus(status) {
        if (status === true) {
            this.setState({ mqttStatus: { text: LANG_CONNECTED, code: 1 } })
        } else {
            this.setState({ mqttStatus: { text: LANG_DISCONNECTED, code: 0 } })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.trackingView}>
                    <TrackingView/>
                </View>
                <View style={styles.controlPane}>
                    <ControlPane/>
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
    trackingView: {
        flex: 10,
        // backgroundColor: 'blue'
    },
    controlPane: {
        flex: 2,
        // backgroundColor: 'transparent',
    }
});

export default connect(null, { mqttConnectionInit })(App)
