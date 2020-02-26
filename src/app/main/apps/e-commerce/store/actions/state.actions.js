import axios from 'axios';

export const GET_STATES = '[ACADEMY APP] GET STATES';
export const GET_SOURCE = '[ACADEMY APP] GET SOURCE';
export const GET_RELATION = '[ACADEMY APP] GET RELATION';
export const GET_CLIENT = '[ACADEMY APP] GET CLIENT';
export const GET_TRANSACTION = '[ACADEMY APP] GET TRANSACTION';
export const GET_ZONES = '[ACADEMY APP] GET ZONES';
export const GET_PROPERTY_TYPE = '[ACADEMY APP] GET PROPERTY TYPE';

export function getPropertyType()
{
    const request = axios.get('http://localhost:5000/api/property_type');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROPERTY_TYPE,
                payload: response.data.data
            })
        );
}

export function getZones()
{
    const request = axios.get('http://localhost:5000/api/zone');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ZONES,
                payload: response.data.data
            })
        );
}


export function getTransaction()
{
    const request = axios.get('http://localhost:5000/api/transaction');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TRANSACTION,
                payload: response.data.data
            })
        );
}

export function getStates()
{
    const request = axios.get('http://localhost:5000/api/progress');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_STATES,
                payload: response.data.data
            })
        );
}

export function getSource()
{
    const request = axios.get('http://localhost:5000/api/source');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SOURCE,
                payload: response.data.data
            })
        );
}
export function getClient()
{
    const request = axios.get('http://localhost:5000/api/client_type');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CLIENT,
                payload: response.data.data
            })
        );
}

export function getRelation()
{
    const request = axios.get('http://localhost:5000/api/relation_type');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_RELATION,
                payload: response.data.data
            })
        );
}