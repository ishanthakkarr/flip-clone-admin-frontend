import { authConstants } from "./constants"
import axios from "../helpers/axios"

export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post(`/admin/signin`, {
            ...user
        })

        if (res.status === 200) {
            const { token, firstName, fullName, lastName, role, _id } = res.data;
            const user = { firstName, fullName, lastName, role, _id };
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
        // dispatch({
        //     type: authConstants.LOGIN_REQUEST,
        //     payload: {
        //         ...user
        //     }
        // })
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
            // dispatch({
            //     payload: {
            //         token
            //     }
            // })
        }
        else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: "Failed to login" }
            })
        }
    }
}

export const signout = () => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        });
        const res = await axios.post(`/admin/signout`)
        if (res.status === 200) {
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            });
        }
        else {
            dispatch({
                type: authConstants.LOGOUT_SUCCESS,
                payload: { error: res.data.error }
            })
        }

    }
}