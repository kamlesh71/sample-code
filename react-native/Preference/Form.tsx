import React from 'react'
import { GenderPicker, FormContainer } from '@components/Form'
import { Select, Slider } from 'components/Form'
import { Container } from 'components/Layout'
import { useForm } from 'hooks/useForm'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/rootRecuer'
import { Preference, PreferenceActionTypes, savePreference } from 'redux/preference'

import AgeRange from '@assets/data/ageRange'
import lookingOptions from '@assets/data/looking'

import { ThunkDispatch } from 'redux-thunk'

const EmptyPreference: Preference = {
    gender: 'Male',
    looking: '',
    maxDistance: 1000,
    ageRange: '20-30',
}

export interface PreferenceHandles {
    save(): void
}

interface Props {
    onSaveSuccess?(): void
}

export const Form = React.forwardRef<PreferenceHandles, Props>((props, ref) => {

    const dispatch = useDispatch<ThunkDispatch<RootState, any, PreferenceActionTypes>>();
    const { preference } = useSelector((state: RootState) => state.preference);

    const initialValues = preference ? preference : EmptyPreference;

    const { getError, values, setValue, setErrors, resetErrors } = useForm<Preference>({ initialValues });

    React.useImperativeHandle(ref, () => ({
        save: () => {

            resetErrors();

            dispatch(savePreference(values)).then(() => {

                if (props.onSaveSuccess) {
                    props.onSaveSuccess();
                }

            }).catch(err => {

                console.log(err.response.status);

                if (err.response && err.response.status === 422) {

                    console.log('errors', err.response.data.errors);

                    setErrors(err.response.data.errors);
                }
            });
        }
    }));

    return (
        <FormContainer>
            <Container>
                <GenderPicker
                    error={getError('gender')}
                    label="Interested In"
                    onValueChange={gender => setValue('gender', gender)}
                    value={values.gender}
                />

                <Select
                    error={getError('looking')}
                    label="Loking for"
                    items={lookingOptions}
                    value={values.looking}
                    onValueChange={looking => setValue('looking', looking)}
                />

                <Select
                    error={getError('ageRange')}
                    label="Age"
                    items={AgeRange}
                    value={values.ageRange}
                    onValueChange={ageRange => setValue('ageRange', ageRange)}
                />

                <Slider
                    error={getError('maxDistance')}
                    valuePostfix=" km"
                    label="Distnace"
                    minimumValue={20}
                    maximumValue={1000}
                    value={values.maxDistance}
                    onValueChange={maxDistance => setValue('maxDistance', Math.ceil(maxDistance))}
                />
            </Container>
        </FormContainer>
    )
})