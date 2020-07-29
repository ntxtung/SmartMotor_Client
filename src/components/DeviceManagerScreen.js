import React from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { Button, Header, ListItem, Overlay, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import {gql} from '@apollo/client'

import { setChosedDevice, setAuthentication } from '../actions';

class DeviceManagerScreen extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            deviceList: [],
            isAddVisible: false
        }
    }
    loadDevices = () => {
        return new Promise(resolve => this.props.gqlClient.query({
            query: gql `
            query GetDevicesByUsername {
                devicesByUsername(input: "${this.props.loggedUser.username}") {
                    _id
                    clientId
                    deviceNumber
                    plateNumber
                }
            }
            `
        }).then(response => {
            this.setState({deviceList: response.data.devicesByUsername})
            resolve()
        }).catch(() => {
            console.log("ERROR")
        }))
    }
    componentDidMount = () => {
        this.loadDevices()
    }
    onPlateNumberChanged = (value) => {
        this.setState({plateNumber: value})
    }
    onDeviceNumberChanged = (value) => {
        this.setState({deviceNumber: value})
    }
    
    onAddDevicePressed = () => {
        this.setState({loading: true})
        this.props.gqlClient.mutate({
            mutation: gql `
            mutation AddNewDevice {
                addNewDevice(
                  input: { clientId: "${this.props.loggedUser.id}", plateNumber: "${this.state.plateNumber}", deviceNumber: "${this.state.deviceNumber}"}
                ) {
                  _id
                  clientId
                  plateNumber
                  deviceNumber
                }
              }
            `
        }).then(response => {
            let newList = [...this.state.deviceList]
            newList.push(response.data.addNewDevice)
            
            this.setState({
                loading: false,
                isAddVisible: false,
                deviceList: newList
            })
        })
        .catch(() => {
            this.setState({
                loading: false,
                isAddVisible: false
            })
            console.log("ERRPR")
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
        console.log(this.state.deviceList)
        return (
            <>
                <View style={styles.container}>
                    <Header
                        style={styles.header}
                        centerComponent={{ text: 'MOTORBIKE E-MANAGEMENT', style: { color: '#fff' } }}
                    />
                    <View style={styles.listPane}>
                        {deviceListRender}
                    </View>
                    <View style={styles.controlPane}>
                        <View style={styles.controlPaneRow}>
                            <View
                                style={styles.logOutBtn}
                            >
                                <Button 
                                    onPress={this.onLogoutPressed}
                                    title="Log Out"
                                />
                            </View>
                            <View
                                style={styles.addBtn}
                            >
                                <Button 
                                    style={styles.addBtn}
                                    title="Add"
                                    type="outline"
                                    onPress={() => this.setState({isAddVisible: true})}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <Overlay isVisible={this.state.isAddVisible}>
                    <View style={styles.addDeviceOverlay}>
                        <Input
                            onChangeText={text => this.onPlateNumberChanged(text)}
                            placeholder='Plate Number'
                            value={this.state.plateNumber}
                            />

                        <Input
                            onChangeText={text => this.onDeviceNumberChanged(text)}
                            placeholder='Device Number'
                            value={this.state.deviceNumber}
                        />
                        <Button
                            onPress={this.onAddDevicePressed}
                            loading={this.state.loading}
                            disabled={this.state.loading}
                            title="Add New Device"
                        />
                        <Button
                            onPress={() => this.setState({isAddVisible: false})}
                            title="Cancel"
                            type='clear'
                        />
                    </View>
                </Overlay>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        // justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
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
    },
    controlPaneRow: {
        display: 'flex',
        flex: 9, 
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: 30
    },
    logOutBtn: {
        flex: 7,
    },
    addBtn: {
        flex: 2,
    },
    addDeviceOverlay: {
        width: 'auto',
        minWidth: '80%'
    }
});

const mapStateToProps = state => {
    const {graphqlClientReducer: {gqlClient}, authReducer} = state
    return {
        gqlClient: gqlClient,
        loggedUser: authReducer
    }
};
export default connect(mapStateToProps, {setChosedDevice, setAuthentication})(DeviceManagerScreen)