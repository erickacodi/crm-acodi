import * as Actions from '../actions';

const initialState = {
    data            : null,
    categories      : [],
    source          : [],
    relation        : [],
    client          : [],
    transaction     : [],
    zones           : [],
    property_type   : []
};

const stateReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PROPERTY_TYPE:
        {
            return {
                ...state,
                property_type: action.payload
            };
        }
        case Actions.GET_ZONES:
        {
            return {
                ...state,
                zones: action.payload
            };
        }
        case Actions.GET_STATES:
        {
            return {
                ...state,
                categories: action.payload
            };
        }
        case Actions.GET_RELATION:
        {
            return {
                ...state,
                relation: action.payload
            };
        }
        case Actions.GET_SOURCE:
        {
            return {
                ...state,
                source: action.payload
            };
        }
        case Actions.GET_CLIENT:
        {
            return {
                ...state,
                client: action.payload
            };
        }
        case Actions.GET_TRANSACTION:
            {
                return {
                    ...state,
                    transaction: action.payload
                };
            }
        default:
        {
            return state;
        }
    }
};

export default stateReducer;
