export const SET_PREFERENCE = 'SET_PREFERENCE';
export const SET_PREFERENCE_SAVING = 'SET_PREFERENCE_SAVING';

export interface Preference {
    gender: "Male" | "Female",
    looking: string,
    ageRange: string,
    maxDistance: number
}

export interface PreferenceState {
    preference: Preference | null,
    states: {
        saving: boolean,
        fetching: boolean
    }
}

export interface SetPreferenceAction {
    type: typeof SET_PREFERENCE,
    preference: Preference
}

export interface SetPreferenceSavingAction {
    type: typeof SET_PREFERENCE_SAVING,
    saving: boolean
}

export type PreferenceActionTypes = SetPreferenceAction | SetPreferenceSavingAction;