import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {connect} from 'react-redux';
import {gql} from '@apollo/client'

// import { setAuthentication } from '../actions';

import TrackingView from './TrackingView'
import ControlPane from './ControlPane'

class MotorbikeManageScreen extends React.Component {
    constructor(props) {
        super(props)
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
        flex: 10,
        // justifyContent: 'center',
        flexDirection: 'column'
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
};

export default connect()(MotorbikeManageScreen);