const initialState = null

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