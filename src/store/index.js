import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from '../reducers'

const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    // whitelist: [
    //   'mapViewReducer',
    // ],
    // // Blacklist (Don't Save Specific Reducers)
    blacklist: [
      'mqttClientReducer',
      'graphqlClientReducer',
      'deviceManageReducer',      
      // 'authReducer',
    ],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(
    persistedReducer,
    applyMiddleware(
      logger,
      thunk
    ),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {
    store,
    persistor,
};