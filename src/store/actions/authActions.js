import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT } from './actionTypes';

export const logout = (msg) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expires');
    if (msg){
        return {
            type: AUTH_LOGOUT,
            payload: {
                isAuth: false,
                alert: msg
            }
        }   
    }
    return {
        type: AUTH_LOGOUT,
        payload: {
            isAuth: false,
            alert: null
        }
    }
}

export const checkAuthTimeout = (expires) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout("your session timed out. Please login again!"))
        } , expires)
    }
}

export const authenticate = (url, formdata) => {

    return async (dispatch) => {
       dispatch({type: AUTH_START, loading: true})
       try {
                const {data} = await axios.post(url, formdata);
                const expiry = new Date(new Date().getTime() + data.data.expires);
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("userId", data.data.id);
                localStorage.setItem("expires", expiry);
                dispatch({type: AUTH_SUCCESS, payload : { 
                    isAuth: true, 
                    token: data.data.token, 
                    userId: data.data.id, 
                    loading: false }});
                dispatch(checkAuthTimeout(data.data.expires));
                
       } catch (err){
       	        dispatch({type: AUTH_FAILED, payload: {error:err.response.data.message}});
       }
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log("authenticating");
        if (token && userId) {
            const expiry = new Date(localStorage.getItem("expires"));
            if (new Date() >= expiry) {
                dispatch(logout());
            }else {
                dispatch({type: AUTH_SUCCESS, payload : { 
                    isAuth: true, 
                    token, userId
                }});
                dispatch(checkAuthTimeout(expiry.getTime() - new Date().getTime()));
            }
        }else {
            dispatch(logout());
        }
    }
}
		
 
