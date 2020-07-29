export const setChosedDevice = (data) => {
    return dispatch => {
        dispatch({
            type: 'SET_CHOSED_DEVICE',
            payload: data
        })
    };
};