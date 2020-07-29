// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import mapViewReducer from './mapViewReducer'
import mqttClientReducer from './mqttClientReducer'
import motorbikeReducer from './motorbikeReducer'
import graphqlClientReducer from "./graphqlClientReducer";
import authReducer from './authReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
    mapViewReducer,
    mqttClientReducer,
    motorbikeReducer,
    graphqlClientReducer,
    authReducer
});
// Exports
export default rootReducer;