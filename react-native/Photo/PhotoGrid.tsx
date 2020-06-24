import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import Toast from 'react-native-simple-toast'
import { ScreenMessage } from 'components/Layout/Utils';
import { PickerHandles, Picker as PhotoPicker, ImageProps } from './Picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/rootRecuer';
import { savePhotos, Photo, PhotoActionTypes } from 'redux/photo';
import { ThunkDispatch } from 'redux-thunk';

export interface PhotoGridHandles {
    save(): void
}

export interface PhotoGridProps {
    onSuccessSave(): void
}

export const PhotoGrid = React.forwardRef<PhotoGridHandles, PhotoGridProps>((props, ref) => {

    const initialPhotos = useSelector((state: RootState) => state.photos.photos);

    const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
    const photoPicker = React.useRef<PickerHandles>(null);

    const photoWithEmptyImage = [
        { 
            uri: '',
            filename: null,
            mime: null
         },
        ...photos
    ];

    const dispatch = useDispatch<ThunkDispatch<RootState, any, PhotoActionTypes>>()

    const _addPhoto = (image: ImageProps) => {
    
        setPhotos(p => ([
            ...p,
            {
                uri: image.path,
                filename: image.filename,
                mime: image.mime
            }
        ]));
    }

    const _showPicker = () => {
        if (photoPicker.current) {
            photoPicker.current.show();
        }
    }

    const renderAddPhoto = () => {

        return (
            <View style={styles.photoContainer}>
                <TouchableOpacity
                    onPress={_showPicker}
                    style={styles.addIconContainer}
                >
                    <AntDesign name="plus" size={30} />
                </TouchableOpacity>
            </View>
        )
    };

    const _renderItem = ({ item, index }: { item: Photo, index: number }) => {

        if (index === 0) {
            return renderAddPhoto();
        }

        return (
            <View style={styles.photoContainer}>
                <Image source={{ uri: item.uri }} style={styles.photo} />
            </View>
        )
    };

    const _keyExtractor = (item: Photo, index: number) => index.toString();

    React.useImperativeHandle(ref, () => ({
        save: () => {
            dispatch(savePhotos(photos)).then(() => {
                props.onSuccessSave();
            }).catch(err => {
                console.log(err);
                if (err.response && err.response.status == 422) {

                    const errors = err.response.data.errors;
                    const message = errors[Object.keys(errors)[0]][0];

                    Toast.show(message, Toast.LONG);
                }
            });
        }
    }));

    const renderContent = () => {

        if (photos.length < 1) {
            return (
                <ScreenMessage
                    icon="account"
                    title="Add Photos"
                    description="Add min 5 photo in which you are clearly visible."
                    button={{
                        title: 'Browse',
                        onPress: _showPicker
                    }}
                />
            )
        }

        return (
            <FlatList
                numColumns={3}
                data={photoWithEmptyImage}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
            />
        )
    }

    return (
        <>
            {renderContent()}
            <PhotoPicker
                ref={photoPicker}
                onImage={_addPhoto}
            />
        </>
    );
});

const styles = StyleSheet.create({
    photoContainer: {
        width: '33.3333%',
        aspectRatio: 1,
        padding: 2
    },
    photo: {
        flex: 1,
        backgroundColor: '#ccc'
    },
    addIconContainer: {
        backgroundColor: '#ccc',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});