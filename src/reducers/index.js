// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import mapViewReducer from './mapViewReducer'
import mqttClientReducer from './mqttClientReducer'
import motorbikeReducer from './motorbikeReducer'
import graphqlClientReducer from "./graphqlClientReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
    mapViewReducer,
    mqttClientReducer,
    motorbikeReducer,
    graphqlClientReducer
});
// Exports
export default rootReducer;