// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import mapViewReducer from './mapViewReducer'
import mqttClientReducer from './mqttClientReducer'
import motorbikeReducer from './motorbikeReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
    mapViewReducer,
    mqttClientReducer,
    motorbikeReducer
});
// Exports
export default rootReducer;