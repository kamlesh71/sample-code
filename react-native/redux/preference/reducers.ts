import { Reducer } from 'redux'
import { PreferenceState, PreferenceActionTypes, SET_PREFERENCE, SET_PREFERENCE_SAVING } from "./types";

const defaultState: PreferenceState = {
    states: {
        fetching: false,
        saving: false
    },
    preference: null
}

export const preferenceReducer: Reducer<PreferenceState, PreferenceActionTypes> = (state = defaultState, action) => {
    
    switch (action.type) {

        case SET_PREFERENCE: {
            return {
                ...state,
                profile: action.preference
            }
        }
        case SET_PREFERENCE_SAVING: {
            return {
                ...state,
                states: {
                    ...state.states,
                    saving: action.saving
                }
            }
        }
    
        default: {
            return state;
        }
    }
}