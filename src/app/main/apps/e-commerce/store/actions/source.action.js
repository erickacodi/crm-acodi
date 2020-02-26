import axios from 'axios';

export const GET_SOURCE = '[ACADEMY APP] GET STATES';
export const GET_SOURCE = '[ACADEMY APP] GET SOURCE';


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