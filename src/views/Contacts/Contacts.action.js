import { toast } from 'react-toastify';
import { GET_ERRORS, BEFORE_CONTACT, GET_CONTACTS, EDIT_CONTACT } from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from './../../config/config';

export const beforeContact = () => {
    return {
        type: BEFORE_CONTACT
    }
}

export const getContacts = (qs = null, body={}) => dispatch => {
    toast.dismiss()
    dispatch(emptyError());
    let url = `${ENV.url}contacts/list`;
    if (qs)
        url += `?${qs}`

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token,
            'x-access-token': localStorage.getItem('admin-accessToken'),
            'user-platform' : 2

        },
        body : JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {
            dispatch({
                type: GET_CONTACTS,
                payload: data.data
            })
        } else {
            if (!qs)
                toast.error(data.message)
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
            if (data.message)
                toast.error(data.message)
        }
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};

export const updateContact = (body, method = 'PUT') => dispatch => {
    toast.dismiss()
    dispatch(emptyError());
    const url = `${ENV.url}contacts/edit`;
    fetch(url, {
        method,
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            dispatch({
                type: EDIT_CONTACT,
                payload: data
            })
        } else {
            toast.error(data.message)
            dispatch({
                type: GET_ERRORS,
                payload: data
            })
        }
    }).catch(error => {
        if (error.response && error.response.data) {
            const { data } = error.response
            if (data.message)
                toast.error(data.message)
        }
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    })
};


