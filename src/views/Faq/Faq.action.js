import { toast } from 'react-toastify';
import { GET_ERRORS, BEFORE_CATEGORY, GET_CATEGORIES, UPSERT_CATEGORY, ADD_CATEGORY, DELETE_CATEGORY, GET_FAQS, BEFORE_FAQ, DELETE_FAQ, CREATE_FAQ, GET_FAQ, EDIT_FAQ} from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from './../../config/config';
import { activity } from 'views/UserManagement/UserManagement.actions';

export const beforeFaq = () => {
    return {
        type: BEFORE_FAQ
    }
}

export const beforeCategory = () => {
    return {
        type: BEFORE_CATEGORY
    }
}
export const getFaqs = (qs = '', body ={}, search) => dispatch => {
    dispatch(emptyError());
    if(!qs){
        toast.dismiss()
    }
    let url = `${ENV.url}faq/list`;
    if (qs)
        url += `?${qs}`

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if (data.success) {

            if(search){
                activity({activityBy: localStorage.getItem('userID') , type: 5 , activityOnModule : 'Faq', activityOnId: null})
            }
            dispatch({
                type: GET_FAQS,
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

export const updateFaq = (body) => dispatch => {
    dispatch(emptyError());
    toast.dismiss()
    const url = `${ENV.url}faq/edit`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            // 
            activity({activityBy: localStorage.getItem('userID') , type: 3 , activityOnModule : 'Faq', activityOnId: data.faqs[0]._id})
            dispatch({
                type: EDIT_FAQ,
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

export const deleteFaq = (faqId) => dispatch => {
    dispatch(emptyError());
    toast.dismiss()
    let url = `${ENV.url}faq/delete/${faqId}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            
            activity({activityBy: localStorage.getItem('userID') , type: 4 , activityOnModule : 'Faq', activityOnId: data?.faqId})
            dispatch({
                type: DELETE_FAQ,
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

export const addFaq = (body) => dispatch => {
    dispatch(emptyError());
    toast.dismiss()
    const url = `${ENV.url}faq/create`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            
            activity({activityBy: localStorage.getItem('userID') , type: 2 , activityOnModule : 'Faq', activityOnId: data?.faq[0]?._id})
            dispatch({
                type : CREATE_FAQ,
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

export const getFaq = (faqId) => dispatch => {
    dispatch(emptyError());
    toast.dismiss()
    let url = `${ENV.url}faq/get/${faqId}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            // toast.success(data.message) //temprarily commented
            dispatch({
                type: GET_FAQ,
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

export const getAllFaqCategories = () => dispatch => {
    dispatch(emptyError())
    toast.dismiss()
    let url = `${ENV.url}faq/get-all-category`;

    fetch(url , {
        method : 'GET' ,
        headers : {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token  
        }
    }).then(res => res.json()).then(data => {
        if(data.success){
            
            toast.success(data.message)
            dispatch({
                type : GET_CATEGORIES , 
                payload : data.category
            })
        }
        else{
            toast.error(data.message)
            dispatch({
                type : GET_ERRORS , 
                payload: data
            })
        }
    }).catch(error => {
        if(error.response && error.response.data){
            const { data } = error.response
            if(data.message)
                toast.error(data.message)
        }
        dispatch({
            type : GET_ERRORS , 
            payload : error
        })
    })
}

export const getListOfCategories = (qs = '' , body = {}, search) => dispatch => {
    dispatch(emptyError())
    if(!qs){
        toast.dismiss()
    }
    let url = `${ENV.url}faq/list-category`;
    if(qs){
        url += `?${qs}`
    }
        
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': ENV.Authorization,
                'x-auth-token': ENV.x_auth_token
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => {
            if (data.success) {
                
                if (!qs){
                    toast.success(data.message)
                }

                if(search){
                    activity({activityBy: localStorage.getItem('userID') , type: 5 , activityOnModule : 'Faq', activityOnId: null})
                }
                dispatch({
                    type: GET_CATEGORIES,
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
}
export const createFaqCategory = (body) => dispatch => {
    dispatch(emptyError())
    toast.dismiss()
    let url = `${ENV.url}faq/create-category`;
    fetch (url , {
        method : 'POST' ,
        headers : {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token  
        },
        body : JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if(data.success){
            toast.success(data.message)
            
            activity({activityBy: localStorage.getItem('userID') , type: 2 , activityOnModule : 'FaqCategory', activityOnId: data?.faqCategory?._id})
            dispatch({
                type : UPSERT_CATEGORY ,
                payload : data.faqCategory
            })
        }else{
            toast.error(data.message)
            // dispatch({
            //     type : GET_ERRORS  ,
            //     payload : error
            // })
        }
    }).catch(error =>{
        if(error.response && error.response.data){
            const { data } = error.response
            if(data.message)
                toast.error(data.message)
        }
        dispatch({
            type : GET_ERRORS , 
            payload : error 
        })
    })
}

export const updateFaqCategory = (body ={} , id) => dispatch => {
    dispatch(emptyError())
    toast.dismiss()
    let url = `${ENV.url}faq/edit-category/${id}`

    fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        if(data.success){
            toast.success(data.message)
            
            activity({activityBy: localStorage.getItem('userID') , type: 3 , activityOnModule : 'FaqCategory', activityOnId: data?.category?._id})
            dispatch({
                type: UPSERT_CATEGORY,
                payload: data.category
            })
        }else{
            toast.error(data.message)
            dispatch({
                type : GET_ERRORS  ,
                payload : error
            })
        }
    }).catch(error =>{
        if(error.response && error.response.data){
            const { data } = error.response
            if(data.message)
                toast.error(data.message)
        }
        dispatch({
            type : GET_ERRORS , 
            payload : error 
        })
    })
}

export const deleteFaqCategory = (id) => dispatch =>{
    
    dispatch(emptyError())
    toast.dismiss()
    let url = `${ENV.url}faq/del-category/${id}`

    fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': ENV.Authorization,
            'x-auth-token': ENV.x_auth_token
        }
    }).then(res => res.json()).then(data => {
        if (data.success) {
            toast.success(data.message)
            
            activity({activityBy: localStorage.getItem('userID') , type: 4 , activityOnModule : 'FaqCategory', activityOnId: id})
            dispatch({
                type: DELETE_CATEGORY,
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
}