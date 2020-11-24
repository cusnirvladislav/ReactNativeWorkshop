import * as types from '../actions/types'
import {REHYDRATE} from "redux-persist";

const initialState = {
    loading: false,
    coffeeShops: [],
    error: ''
}

export default (state=initialState, action) => {
    switch (action.type){
        case REHYDRATE:
            return {
                ...state,
                coffeeshops: action.payload
            } || state
        case types.REQUEST_COFFEESHOPS:
            return {
                ...state,
                loading: true
            }
        case types.REQUEST_COFFEESHOPS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.REQUEST_COFFEESHOPS_SUCCESS:
            return {
                ...state,
                loading: false,
                coffeeShops: action.payload
            }
        default: return state;
    }
}