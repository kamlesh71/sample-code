import { Profile } from '@redux/profile'
import { Preference } from '@redux/preference'

export const AUTH_SET_LOGGIN_IN = 'AUTH_SET_LOGGIN_IN';
export const AUTH_SET_LOGGED_IN = 'AUTH_SET_LOGGED_IN';
export const AUTH_SET_LOGIN_FAILED = 'AUTH_SET_LOGIN_FAILED';

export interface AuthState {
    isLoggedIn: boolean,
    isLoginComplete: boolean,
    logginIn: boolean,
    accessToken: string | null
}

export interface SetLogginInAction {
    type: typeof AUTH_SET_LOGGIN_IN,
    logginIn: boolean
}

export interface SetLoginFailedAction {
    type: typeof AUTH_SET_LOGIN_FAILED
}

export interface SetLoggedInTypeAction {
    type: typeof AUTH_SET_LOGGED_IN,
    payload: {
        accessToken: string
    }
}

export interface AuthResult {
    data: {
        id: number,
        email: string,
        profile: Profile,
        preference: Preference,
        registeredAt: string
    },
    authentication: {
        accessToken: string,
        expiresAt: string,
        authType: string
    }
}

export type AuthActionTypes = SetLogginInAction | SetLoginFailedAction | SetLoggedInTypeAction
