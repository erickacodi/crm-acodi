import axios from 'axios';

export const GET_ORDERS = '[E-COMMERCE APP] GET ORDERS';
export const SET_ORDERS_SEARCH_TEXT = '[E-COMMERCE APP] SET ORDERS SEARCH TEXT';
export const SET_ORDERS_SEARCH_TEXT2 = '[E-COMMERCE APP] SET ORDERS2 SEARCH TEXT2';

export function getOrders()
{
    const request = axios.get('http://localhost:5000/api/client');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ORDERS,
                payload: response.data
            })
        );
}

export function getOrder(param)
{
    const request = axios.get('http://localhost:5000/api/client/' + param.clientId);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ORDERS,
                payload: response.data
            })
        );
}

export function setOrdersSearchText2(e)
{
    return {
        type      : SET_ORDERS_SEARCH_TEXT2,
        payload: e.target.value
    }
}

export function setOrdersSearchText(event)
{
    return {
        type      : SET_ORDERS_SEARCH_TEXT,
        payload: event.target.value
    }
}


