export const setAuthentication = (data) => {
    return dispatch => {
        dispatch({
            type: 'SET_AUTH',
            payload: data
        })
    };
};