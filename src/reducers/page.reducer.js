import { pageConstants } from "../actions/constants"

const initState = {
    error: null,
    loading: false,
    page: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                loading: false
            }
            break;
        case pageConstants.CREATE_PAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state;
}