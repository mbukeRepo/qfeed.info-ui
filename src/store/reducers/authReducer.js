import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT} from "../actions/actionTypes"

const initialState = {
    token:null,
    expires:null,
    loading: false,
    userId: null,
    isAuth : false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
        case AUTH_SUCCESS:
        case AUTH_FAILED:
        case AUTH_LOGOUT:
            return {
                state,
                ...action.payload
            }
        default:
            return state
    }
}

export default reducer;
