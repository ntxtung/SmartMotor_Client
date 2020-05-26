import React from 'react';
import { StyleSheet, View } from 'react-native';
import {connect} from 'react-redux'

import { LANG_CONNECTED, LANG_DISCONNECTED } from './constants'

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
        flex: 1,
        // backgroundColor: 'transparent',
    }
});

export default connect(null, { mqttConnectionInit })(App)
