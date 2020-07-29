const initialState = {
    auth: {
        id: '',
        username: '',
        token: ''
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH': {
            if (action.payload) {
                let newAuth = state
                const {id, username, token} = action.payload
                if (id) {
                    newAuth.id = id
                }
                if (username) {
                    newAuth.username = username
                }
                if (token) {
                    newAuth.token = token
                }
                console.log("new Auth: ", newAuth)
                return {
                    ...state,
                    newAuth
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