import React from 'react';
import { Colors } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    HeaderButtons,
    HeaderButton as RNHeaderButton,
    Item
} from 'react-navigation-header-buttons';

const HeaderButtonComponent = (props: any) => (
    <RNHeaderButton {...props}
        IconComponent={AntDesign}
        iconSize={23}
        color={Colors.blueGrey600}
    />
);

interface HeaderButtonContainerProps {
    left?: boolean
}

export const HeaderButtonContainer: React.FC<HeaderButtonContainerProps> = ({ children, left }) => (
    <HeaderButtons
        left={left}
        HeaderButtonComponent={HeaderButtonComponent}
    >
        {children}
    </HeaderButtons>
);

interface HeaderButtonProps {
    title: string,
    icon?: string,
    onPress?: () => void
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ title, icon, onPress }) => (
    <Item
        title={title}
        iconName={icon}
        onPress={onPress}
    />
)