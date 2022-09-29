import { productConstants } from "../actions/constants"

const initState = {
    error: null,
    loading: false,
    products: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    }
    console.log(state);
    return state;
}