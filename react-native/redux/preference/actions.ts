import { Preference, SET_PREFERENCE, PreferenceActionTypes, SET_PREFERENCE_SAVING } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "redux/rootRecuer";
import Axios from "axios";

export const setPerference = (preference: Preference): PreferenceActionTypes => ({
    type: SET_PREFERENCE,
    preference
})

export const setPreferenceSaving = (saving: boolean): PreferenceActionTypes => ({
    type: SET_PREFERENCE_SAVING,
    saving
})

export const savePreference = (preference: Preference): ThunkAction<Promise<Preference>, RootState, any, PreferenceActionTypes> => {
    return async dispatch => {

        try {

            dispatch(setPreferenceSaving(true));

            const { data } = await Axios.post<Preference>('/user/preference', preference);

            dispatch(setPerference(data));

            return data;

        } catch (err) {
            return await Promise.reject(err);
        } finally {
            dispatch(setPreferenceSaving(false));
        }
    }
}