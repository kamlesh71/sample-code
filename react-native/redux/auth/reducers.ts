import { Reducer } from "redux";
import {
    AuthState,
    AuthActionTypes,
    AUTH_SET_LOGGED_IN,
    AUTH_SET_LOGGIN_IN
} from "./types";
import { act } from "react-test-renderer";


const defaultState: AuthState = {
    logginIn: false,
    isLoggedIn: false,
    isLoginComplete: false,
    accessToken: null
};

export const authReducer: Reducer<AuthState, AuthActionTypes> = (state = defaultState, action) => {

    switch (action.type) {
        case AUTH_SET_LOGGED_IN: {

            const { accessToken } = action.payload;

            return {
                ...state,
                accessToken
            }
        }
        case AUTH_SET_LOGGIN_IN: {
            return {
                ...state,
                logginIn: action.logginIn
            }
        }
        default: {
            return state;
        }
    }

}