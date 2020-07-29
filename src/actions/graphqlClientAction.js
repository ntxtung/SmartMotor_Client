export const graphqlConnectionInit = () => {
    return dispatch => {
        dispatch({
            type: 'GQL_INIT_CONNECTION',
        })
    };
};