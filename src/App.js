import React from 'react';
import { StyleSheet, View } from 'react-native';
import {connect} from 'react-redux'

import { LANG_CONNECTED, LANG_DISCONNECTED } from './constants'

import TrackingView from './components/TrackingView'
import ControlPane from './components/ControlPane'
import LoginScreen from './components/LoginScreen'

import { mqttConnectionInit, graphqlConnectionInit } from './actions'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.mqttConnectionInit()
        this.props.graphqlConnectionInit()
    }

    componentWillUnmount() {
    }

    render() {
        if (this.props.loggedUsername) {
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
        } else {
            return (
                <View style={styles.loginContainer}>
                    <LoginScreen />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        // justifyContent: 'center',
        flexDirection: 'column'
    },
    loginContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "10%",
        paddingRight: "10%"
    },  
    trackingView: {
        flex: 9,
        // backgroundColor: 'blue'
    },
    controlPane: {
        flex: 1,
        // backgroundColor: 'transparent',
    }
});

const mapStateToProps = state => {
    const {authReducer: {username}} = state
    return {
        loggedUsername: username
    };
};

export default connect(mapStateToProps, { mqttConnectionInit, graphqlConnectionInit })(App)
