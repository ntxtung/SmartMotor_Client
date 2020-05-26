import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../constants'

const initialState = {
    region: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
}

const mapViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_REGION': {
            if (action.payload) {
                let region = action.payload
                return {
                    ...state,
                    region
                }
            }
        }

        // Default
        default: {
            return state;
        }
    }
};
// Exports
export default mapViewReducer;