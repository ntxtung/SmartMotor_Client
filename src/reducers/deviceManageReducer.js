const initialState = {
    clientId: null, 
    deviceNumber: null, 
    plateNumber: null, 
    _id: null
}

const deviceManageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHOSED_DEVICE': {
            if (action.payload) {
                const {clientId, deviceNumber, plateNumber, _id} = action.payload
                return {
                    ...state,
                    clientId, deviceNumber, plateNumber, _id
                }
            } else {
                return {
                    ...initialState
                }
            }
        }

        // Default
        default: {
            return state;
        }
    }
};

export default deviceManageReducer;