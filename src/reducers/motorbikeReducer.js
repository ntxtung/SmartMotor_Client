import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../constants'

const initialState = {
    device: {
        lat: DEFAULT_LATITUDE,
        lon: DEFAULT_LONGITUDE
    }
}

const motorbikeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MOTORBIKE': {
            let newState = state

            newState[action.payload.id] = action.payload
            
            return newState
        }
        case 'UPDATE_MOTORBIKE': {
            let newData = action.payload
            
            return {
                ...state,
                device: newData
            }
        }
        // Default
        default: {
            return state;
        }
    }
};
// Exports
export default motorbikeReducer;