import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: '',
    searchText2: ''
};

const ordersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ORDERS:
        {
            return {
                ...state,
                data: action.payload.orders
            };
        }
        case Actions.GET_ORDER:
            {
                return {
                    ...state,
                    data: action.payload.orders
                };
            }
        case Actions.SET_ORDERS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.payload
            };
        }
        case Actions.SET_ORDERS_SEARCH_TEXT2:
        {
            return {
                ...state,
                searchText2: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default ordersReducer;
