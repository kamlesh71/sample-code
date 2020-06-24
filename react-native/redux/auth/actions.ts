import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { AUTH_SET_LOGGED_IN, AUTH_SET_LOGGIN_IN, SetLoggedInTypeAction, AuthActionTypes, AuthResult } from "./types";
import { RootState } from '@redux/rootRecuer'
import { setProfile, ProfileActionTypes } from '@redux/profile';
import { setPerference, PreferenceActionTypes } from '@redux/preference';

type ThunkResult<Result> = ThunkAction<
    Result,
    RootState,
    undefined,
    AuthActionTypes | ProfileActionTypes | PreferenceActionTypes
>;

export const setLogginIn = (logginIn = true): AuthActionTypes  => ({
    type: AUTH_SET_LOGGIN_IN,
    logginIn
})

export const setLoggedIn = (accessToken: string): SetLoggedInTypeAction => ({
    type: AUTH_SET_LOGGED_IN,
    payload: {
        accessToken
    }
})

export const loginWithFacebook = (accessToken: string): ThunkResult<Promise<AuthResult>> => {

    return async (dispatch) => {
        try {

            dispatch(setLogginIn(true));

            const { data } = await axios.post<AuthResult>('/auth/login', { access_token: accessToken });

            dispatch(setLoggedIn(data.authentication.accessToken));
            dispatch(setProfile(data.data.profile));
            dispatch(setPerference(data.data.preference));

            return data;

        } catch (error) {
            return await Promise.reject(error);
        } finally {
            dispatch(setLogginIn(false));
        }
    }
}