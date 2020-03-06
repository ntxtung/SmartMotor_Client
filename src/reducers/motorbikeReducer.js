const initialState = null

const motorbikeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MOTORBIKE': {
            let newState = state

            newState[action.payload.id] = action.payload
            
            return newState
        }
        case 'UPDATE_MOTORBIKE': {
            let newState = state
            let newData = action.payload
            
            newState[newData.id] = newData

            return newData

        }
        // Default
        default: {
            return state;
        }
    }
};
// Exports
export default motorbikeReducer;