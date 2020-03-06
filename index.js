/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import React from 'react'
import {name as appName} from './app.json';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from './src/store'

const ReduxApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);
