import React from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {gql} from '@apollo/client'

import { setChosedDevice, mqttConnectionSubscribe, mqttConnectionUnsubscribe } from '../actions';

import TrackingView from './TrackingView'
import ControlPane from './ControlPane'

import {
    MQTT_TOPIC_TRACKING
  } from '../constants';

class MotorbikeManageScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    backAction = async () => {
        let {deviceNumber} = this.props.chosedDevice
        await this.props.mqttConnectionUnsubscribe(MQTT_TOPIC_TRACKING + deviceNumber)
        this.props.setChosedDevice(null)
    }
    
    componentDidMount() {
        this.props.mqttConnectionSubscribe(MQTT_TOPIC_TRACKING + this.props.chosedDevice.deviceNumber)
    }
    

    render() {
        console.log(this.props.chosedDevice)
        const {plateNumber} = this.props.chosedDevice
        return (
            <View style={styles.container}>
                <Header 
                    statusBarProps={{ translucent: true }}
                    containerStyle={styles.header}
                    leftComponent={<Icon name='home' color='white' onPress={this.backAction} />}
                    centerComponent={{ text: plateNumber, style: { color: '#fff', fontWeight:'bold' } }}
                    rightComponent={<Icon name='schedule' color='white' />}
                />
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
    header: {
        // flex: 1,
        // paddingTop: 10,
        // paddingBottom: 0,
        // height: 10
        backgroundColor: '#141414'
    },
    trackingView: {
        flex: 8,
        // backgroundColor: 'blue'
    },
    controlPane: {
        flex: 1,
        // backgroundColor: 'transparent',
    }
});

const mapStateToProps = state => {
    const {deviceManageReducer} = state
    return {
        chosedDevice: deviceManageReducer
    }
};

export default connect(mapStateToProps, {setChosedDevice, mqttConnectionSubscribe, mqttConnectionUnsubscribe})(MotorbikeManageScreen);