import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Title } from 'react-native-paper'
import Toast from 'react-native-simple-toast'
import interests from '@assets/data/interests'
import { Container } from 'components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { Interest, saveIntrests, InterstState, InterestActionTypes } from '@redux/interest'
import { RootState } from '@redux/rootRecuer'

import { InterestButton } from './InterestButton'
import { ThunkDispatch } from 'redux-thunk'

const data: Interest[] = interests.map((i: any, index: number) => {
    return {
        id: index + 1,
        name: i.name
    }
}).splice(0, 50);

interface Props {
    onSaveSuccess?(): void
}

export interface PickerHandlers {
    save(): void
}

export const Picker = React.forwardRef<PickerHandlers, Props>(( props , ref) => {

    const dispatch = useDispatch<ThunkDispatch<RootState, any, InterestActionTypes>>();

    const { interests: initialInterests } = useSelector((state: RootState) => state.interest);

    const [interests, setInterests] = React.useState<Interest[]>(initialInterests);

    const _onTagSelected = (interest: Interest) => {

        const tagIndex = interests.findIndex(t1 => t1.name === interest.name);
        const isSelected = tagIndex !== -1;

        if (isSelected) {
            const newInterests = [...interests];
            newInterests.splice(tagIndex, 1)
            setInterests(newInterests);
        }
        else {
            setInterests([
                ...interests,
                interest
            ])
        }
    }

    React.useImperativeHandle(ref, () => ({
        save: () => {
            dispatch(saveIntrests(interests)).then(res => {
                if (props.onSaveSuccess) {
                    props.onSaveSuccess();
                }
            }).catch(err => {
                if (err.response && err.response.status === 422) {

                    const errors = err.response.data.errors;
                    const message = errors[Object.keys(errors)[0]][0];

                    Toast.show(message, Toast.LONG);
                }
            });
        }
    }));

    return (
        <ScrollView
            removeClippedSubviews
        >
            <Container
                style={styles.container}
            >
                <Title>Select upto 10 interests</Title>
                <View style={styles.tagsContainer}>
                    {data.map(t => {

                        const tagIndex = interests.findIndex(t1 => t1.id === t.id);
                        const isSelected = tagIndex !== -1;

                        return (
                            <InterestButton
                                interest={t}
                                key={t.name}
                                onPress={_onTagSelected}
                                isSelected={isSelected}
                            />
                        )
                    })}
                </View>
            </Container>
        </ScrollView>
    )
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 40
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 40
    }
});