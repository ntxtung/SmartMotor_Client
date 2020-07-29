import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_HOST } from '../constants'

import {store} from '../store'
const initialState = {
    gqlClient: null
};

const createGqlClient = () => {
    const client = new ApolloClient({
        uri: GRAPHQL_HOST,
        cache: new InMemoryCache()
    });

    return client
}

const graphqlClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GQL_INIT_CONNECTION': {
            return {
                ...state,
                gqlClient: createGqlClient()
            }
        }
        case 'GQL_CONNECTED':
        default: {
            return state;
        }
    }
}

export default graphqlClientReducer;