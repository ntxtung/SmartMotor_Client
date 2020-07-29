const initialState = {
    id: '',
    username: '',
    token: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH': {
            if (action.payload) {
                const {id, username, token} = action.payload
                return {
                    ...state,
                    id, username, token
                }
            }
        }

        // Default
        default: {
            return state;
        }
    }
};

export default authReducer;