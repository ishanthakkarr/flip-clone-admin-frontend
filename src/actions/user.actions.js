import { authConstants, userConsrants } from "./constants"
import axios from "../helpers/axios"
export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: userConsrants.USER_REGISTER_REQUEST });
        const res = await axios.post(`/admin/signup`, {
            ...user
        })

        if (res.status === 201) {
            const message  = res.data.message;
            dispatch({
                type: userConsrants.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: userConsrants.USER_REGISTER_FAILURE,
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
