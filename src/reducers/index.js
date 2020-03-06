// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import mapViewReducer from './mapViewReducer'
import mqttClientReducer from './mqttClientReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
    mapViewReducer,
    mqttClientReducer
});
// Exports
export default rootReducer;