import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import history from '@history';

export const GET_PRODUCT = '[E-COMMERCE APP] GET PRODUCT';
export const SAVE_PRODUCT = '[E-COMMERCE APP] SAVE PRODUCT';
export const UPDATE_PRODUCT = '[E-COMMERCE APP] UPDATE PRODUCT';


 export function getProduct(params)
{
    const request = axios.get('http://localhost:5000/api/client/' + params.clientId);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCT,
                payload: response.data.data[0]
            })
        );
} 

export function saveProduct(data)
{
    const request = axios.post('http://localhost:5000/api/client/', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Nuevo cliente guardado'}));

                return dispatch({
                    type   : SAVE_PRODUCT,
                    payload: response.data
                })
            }
        );
}

export function updateProduct(data)
{
    const request = axios.put('http://localhost:5000/api/client/'+data.id_client, data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Cliente actualizado'}));
                history.push({
                    pathname: '/apps/client'
                });
                return dispatch({
                    type   : SAVE_PRODUCT,
                    payload: response.data
                })
            }
        );
}

export function newProduct()
{
    const data = {
        name            : '',
        last_name          : '',
        email     : '',
        phone_number      : null,
        bitacora            : null,
        status_mailing          : null,
        branch_office    : null,
        status    : null,
        id_source         : null,
        created_at   : null,
        cellphone        : null,
        email2        : null,
        id_source        : null,
        id_progress        : null,
    };

    return {
        type   : GET_PRODUCT,
        payload: data
    }
}
