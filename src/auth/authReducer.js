import * as ACTION_TYPES from "./authActionTypes";

export const initialUserState = {
    is_authenticated: false,
    profile: {},
};

export const AuthReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                is_authenticated: true,
            };
        case ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                is_authenticated: false,
            };
        case ACTION_TYPES.ADD_PROFILE:
            return {
                ...state,
                is_authenticated: true,
                profile: action.payload,
            };
        case ACTION_TYPES.REMOVE_PROFILE:
            return {
                ...state,
                is_authenticated: false,
                profile: {},
            };
        default:
            return state;
    }
};
