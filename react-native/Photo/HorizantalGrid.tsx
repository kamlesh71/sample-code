import React from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Photo } from '@app-types/PhotoTypes'

interface GridProps {
    photos: Photo[],
    onPress?: (photo: Photo) => void,
    style?: object
};

export const PhotoHorizantalGrid: React.FC<GridProps> = ({ photos, style }) => {

    const _renderItem = ({ item }: { item: Photo }) => {
        return (
            <TouchableOpacity onPress={() => {}}>
                <Image
                    source={{ uri: item.url }}
                    style={styles.photo}
                />
            </TouchableOpacity>
        )
    };

    const _keyExtractor = (item: any, index: number) => {
        return index.toString();
    }

    return (
        <>
            <FlatList
                style={styles.flatList}
                contentContainerStyle={[styles.container, style]}
                data={photos}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5
    },
    flatList: {
        flex: 1
    },
    photo: {
        width: 100,
        aspectRatio: 1,
        marginHorizontal: 4,
        borderRadius: 10
    }
});