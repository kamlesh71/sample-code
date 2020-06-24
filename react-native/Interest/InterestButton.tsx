import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Interest } from '@redux/interest'
import { useTheme } from 'react-native-paper'

interface Props {
    interest: Interest,
    isSelected: boolean,
    onPress(tag: Interest): void
}


export const InterestButton: React.FC<Props> = React.memo(({ interest, isSelected, onPress }) => {

    const theme = useTheme();

    const backgroundColor = isSelected ? theme.colors.primary : 'white';
    const textColor = isSelected ? 'white' : theme.colors.primary

    return (
        <TouchableOpacity
            onPress={() => onPress(interest)}
            style={[styles.interest, {
                borderWidth: 1,
                borderColor: textColor,
                backgroundColor
            }]}
        >
            <Icon
                size={16}
                name={`check-circle${isSelected ? '' : '-outline'}`}
                color={textColor}
            />
            <Text style={[styles.interestText, { color: textColor }]}>{interest.name}</Text>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    interest: {
        marginHorizontal: 6,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 30,
    },
    interestText: {
        paddingLeft: 4
    }
});