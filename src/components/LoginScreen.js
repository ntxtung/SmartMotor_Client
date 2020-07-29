import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { Input, Button } from 'react-native-elements';
import {connect} from 'react-redux';
import {gql} from '@apollo/client'

import { } from '../actions';


class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            loading: false
        }
    }

    onSubmitPressed = () => {
        console.log(`Username: ${this.state.username}\nPassword: ${this.state.password}`)
        this.setState({loading: true})
        this.props.gqlClient.mutate({
            mutation: gql `
            mutation login {
                login (input: {username: "${this.state.username}", password: "${this.state.password}"}) {
                    token
                }
            }
            `
        }).then(response => {
            this.setState({loading: false})
            console.log("RESP:",response)
        })
    }

    onUsernameChanged = (value) => {
        this.setState({username: value})
    }
    onPasswordChanged = (value) => {
        this.setState({password: value})
    }

    render() {
        return (
            <>
                <Input
                    onChangeText={text => this.onUsernameChanged(text)}
                    placeholder='Username'
                    value={this.state.username}
                    />

                <Input
                    onChangeText={text => this.onPasswordChanged(text)}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <Button
                    onPress={this.onSubmitPressed}
                    loading={this.state.loading}
                    title="Login"
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    if (state.graphqlClientReducer) {
      return {
        gqlClient: state.graphqlClientReducer.gqlClient
      };
    } else {
      return {};
    }
  };

export default connect(mapStateToProps, null)(LoginScreen);