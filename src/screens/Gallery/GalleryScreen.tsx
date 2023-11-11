import { useIsFocused } from '@react-navigation/native';
import React, { useLayoutEffect as useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Background, Canvas, CustomModal, PermissionView, Picture } from '../../components';
import { useGalleryContext, useUIContext } from '../../context';
import { useFetchAlbum } from '../../hooks';
const GalleryScreen: React.FC = () => {
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const { data, favorite, resetGalleryState } = useGalleryContext();
    const { resetUIState, isPress, isLongPress } = useUIContext();
    const { fetchAlbum, hasPermission } = useFetchAlbum();

    // Reconcile when memoized fetchAlbum is changed.
    // TODO: Pictures taken is not updated in UI - having it as dependency cause heavy rendering fix this?
    useEffect(() => {
        fetchAlbum();
    }, [hasPermission]);

    useEffect(() => {
        return () => {
            // Reset states when leaving the screen
            // Reset drawer state, press state, long press state, all selected pictures
            resetUIState();
            resetGalleryState();
            // console.log('Unmounted Gallery Screen');
        };
    }, [isFocused]);

    useEffect(() => {
        // Open modal on item click.
        if (isPress && !isLongPress) {
            setToggleModal(true);
        }
        // Close modal on unmount.
        if (!isFocused) setToggleModal(false);
    }, [isPress, isFocused]);

    const handleToggleModal = () => {
        setToggleModal(false);
    };

    return (
        <Background>
            <View className="flex-1 w-full bottom-[4.5%] justify-center items-center">
                {!hasPermission ? (
                    <PermissionView />
                ) : (
                    <Canvas isFocused={isFocused} title={'Media'}>
                        <View className="w-full h-full overflow-hidden">
                            <View className="border-[0.3px] border-white w-full h-[25%] justify-center items-center">
                                <Text className="w-full p-2 text-neutral font-handjet-light">
                                    Favorites
                                </Text>

                                <FlatList
                                    data={favorite}
                                    keyExtractor={(item: any) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Picture
                                            uri={
                                                item.uri ??
                                                'https://cdn-icons-png.flaticon.com/512/2333/2333464.png'
                                            }
                                            key={index}
                                            id={item.id}
                                            firstName={item.firstName}
                                        />
                                    )}
                                    removeClippedSubviews={true}
                                    showsVerticalScrollIndicator={false}
                                    initialNumToRender={10}
                                    maxToRenderPerBatch={10}
                                    windowSize={5}
                                    numColumns={4}
                                />
                            </View>
                            <View className="justify-center items-center">
                                <Text className="w-full p-2 text-neutral font-handjet-light">
                                    Gallery
                                </Text>
                                <FlatList
                                    data={data}
                                    keyExtractor={(item: any) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Picture
                                            uri={item.uri}
                                            key={index}
                                            id={item.id}
                                            firstName={item.first_name}
                                        />
                                    )}
                                    removeClippedSubviews={true}
                                    showsVerticalScrollIndicator={false}
                                    initialNumToRender={10}
                                    maxToRenderPerBatch={20}
                                    numColumns={4}
                                    windowSize={5}
                                />
                            </View>
                        </View>
                    </Canvas>
                )}
                {toggleModal ? (
                    <CustomModal
                        toggleModal={handleToggleModal}
                        onPress={handleToggleModal}
                        intensity={8}
                        className="absolute w-full h-[91%] justify-center items-center"
                    >
                        <Text className="text-neutral font-handjet-light text-xl">Picture</Text>
                    </CustomModal>
                ) : null}
            </View>
        </Background>
    );
};
export default GalleryScreen;
