import React from 'react';
import { Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {connect} from 'react-redux';
import {gql} from '@apollo/client'

import { setAuthentication } from '../actions';


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
        this.setState({loading: true})
        this.props.gqlClient.mutate({
            mutation: gql `
            mutation login {
                login (input: {username: "${this.state.username}", password: "${this.state.password}"}) {
                    token
                }
            }
            `
        }).then((response, err) => {
            this.setState({loading: false})
            const {data: {login: {token}}} = response
            if (token) {
                this.props.gqlClient.query({
                    query: gql `
                    query GetUserByUsername {
                        userByUsername(input: "${this.state.username}") {
                            _id
                        }
                    } 
                    `
                }).then(response2 => {
                    console.log(response2)
                    this.props.setAuthentication({
                        id: response2.data.userByUsername._id,
                        username: this.state.username,
                        token: token
                    })
                }) 
            } 
        }).catch(() => {
            this.setState({loading: false})
            Alert.alert(
                "Login Failed",
                "Wrong username or password",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Clear",
                        onPress: () => this.setState({username: '', password: ''})
                    }
                ],
                {
                    cancelable: false
                }
            )
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
                    disabled={this.state.loading}
                    title="Login"
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    const {graphqlClientReducer: {gqlClient}} = state
    return {
        gqlClient: gqlClient
    }
};

export default connect(mapStateToProps, {setAuthentication})(LoginScreen);