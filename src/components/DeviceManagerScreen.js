import React from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { Button, Header, ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import {gql} from '@apollo/client'

import { setChosedDevice, setAuthentication } from '../actions';

class DeviceManagerScreen extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            deviceList: []
        }
    }
    componentDidMount = () => {
        this.props.gqlClient.query({
            query: gql `
            query GetDevicesByUsername {
                devicesByUsername(input: "${this.props.loggedUsername}") {
                    _id
                    clientId
                    deviceNumber
                    plateNumber
                }
            }
            `
        }).then(response => {
            this.setState({deviceList: response.data.devicesByUsername})
        }).catch(() => {
            console.log("ERROR")
        })
    }
    onLogoutPressed = () => {
        this.props.setAuthentication({
            id: '',
            username: '',
            token: ''
        })
    }

    onDeviceChosed = (item) => {
        console.log("Item:", item)
        this.props.setChosedDevice(item)
    }

    render() {
        const deviceListRender = this.state.deviceList.map((item, i) => (
            <ListItem
                key = {i}
                title = {item.plateNumber}
                rightElement = {<Text>{item.deviceNumber}</Text>}
                onPress = {() => this.onDeviceChosed(item)}
                bottomDivider
            />
        ))
        return (
            <>
                <Header
                    style={styles.header}
                    centerComponent={{ text: 'MOTORBIKE E-MANAGEMENT', style: { color: '#fff' } }}
                />
                <View style={styles.listPane}>
                    {deviceListRender}
                </View>
                <Button 
                    style={styles.controlPane}
                    onPress={this.onLogoutPressed}
                    // loading={this.state.loading}
                    // disabled={this.state.loading}
                    title="Log Out"
                />               
            </>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1
    },
    listPane: {
        flex: 8,
        // backgroundColor: 'blue',
    },
    controlPane: {
        flex: 1,
        // backgroundColor: 'red',
    }
});

const mapStateToProps = state => {
    const {graphqlClientReducer: {gqlClient}, authReducer: {username}} = state
    return {
        gqlClient: gqlClient,
        loggedUsername: username
    }
};
export default connect(mapStateToProps, {setChosedDevice, setAuthentication})(DeviceManagerScreen)