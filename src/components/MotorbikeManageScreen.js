import React from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { Header, Button } from 'react-native-elements';
import {connect} from 'react-redux';
import {gql} from '@apollo/client'

import { setChosedDevice } from '../actions';

import TrackingView from './TrackingView'
import ControlPane from './ControlPane'

class MotorbikeManageScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    backAction = () => {
        this.props.setChosedDevice()
    }
    
    componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
    )
    }
    
      componentWillUnmount() {
        this.backHandler.remove();
      }
    render() {
        console.log(this.props.chosedDevice)
        const {plateNumber} = this.props.chosedDevice
        return (
            <View style={styles.container}>
                <Header 
                    statusBarProps={{ translucent: true }}
                    containerStyle={styles.header}
                    centerComponent={{ text: plateNumber, style: { color: '#fff', fontWeight:'bold' } }}
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
        flex: 1,
        paddingTop: 10,
        paddingBottom: 0,
        // height: 10
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

export default connect(mapStateToProps, {setChosedDevice})(MotorbikeManageScreen);