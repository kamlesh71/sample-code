import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import RNPicker, { Image as NativeImageProps, Options } from 'react-native-image-crop-picker'

export type ImageProps = NativeImageProps;

interface PickerProps {
    onImage(image: ImageProps | ImageProps[]): void
}

export interface PickerHandles {
    show(): void
}

const IMGAE_HEIGHT = 1200;

const options: Options = {
    width: IMGAE_HEIGHT * 3 / 4,
    height: IMGAE_HEIGHT,
    cropping: true,
    compressImageQuality: .9,
    compressImageMaxWidth: IMGAE_HEIGHT * 3 / 4,
    compressImageMaxHeight: IMGAE_HEIGHT,
    forceJpg: true,
    cropperToolbarColor: 'white',
    cropperTintColor: 'white',
    cropperStatusBarColor: 'white',
    disableCropperColorSetters: true
};

export const Picker = React.forwardRef<PickerHandles, PickerProps>(({ onImage }, ref: any) => {

    const bottomSheetRef = useRef(null);

    const _onSelected = (index: number) => {
        switch (index) {
            case 0: {
                RNPicker.openCamera(options).then((res) => {
                    onImage(res);
                }).catch((err: any) => console.log('camera error', err));
                break;
            }
            case 1: {
                RNPicker.openPicker(options).then((res) => {
                    onImage(res);
                }).catch((err: any) => console.log('picker error', err));
                break;
            }
        }
    };

    React.useImperativeHandle(ref, () => ({
        show: () => {
            if (bottomSheetRef.current) {
                bottomSheetRef.current.show();
            }
        }
    }));

    return (
        <ActionSheet
            ref={bottomSheetRef}
            //title={'Choose'}
            options={['Take a Photo', 'Choose Photo', 'Cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={2}
            onPress={_onSelected}
        />
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: 'white',
        width: "80%",
        borderRadius: 4
    }
})