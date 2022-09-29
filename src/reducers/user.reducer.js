import { userConsrants } from "../actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case userConsrants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConsrants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                loading:false
            }
            break;
        case userConsrants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    console.log(state);
    return state;
}