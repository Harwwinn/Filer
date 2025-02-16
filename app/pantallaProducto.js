import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import { useState, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import React from 'react'
import { useRoute } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import index from '.';

export default function pantallaProducto() {

    const route = useRoute();
    const { item } = route.params;
    const data = [
        { id: '1', imagen: images[item.imagen] },
        { id: '2', imagen: images[item.imagen] }
    ];
    let especificaciones = []
    if (item.specifications) {
        for (let i = 0; i < item.specifications.length; i++) {
            if (i == item.specifications.length - 1) {
                especificaciones.push(
                    <View key={i} className='flex flex-row border-t-slate-400 border-2 border-b-slate-400 border-x-transparent py-2'>
                        <Text className='w-3/6'>
                            {item.specifications[i][0]}
                        </Text>
                        <Text className='w-3/6 text-base pl-3'>
                            {item.specifications[i][1]}
                        </Text>
                    </View>)
            }
            else {
                especificaciones.push(
                    <View key={i} className='flex flex-row border-t-slate-400 border-2 border-b-transparent border-x-transparent py-2'>
                        <Text className='w-3/6'>
                            {item.specifications[i][0]}
                        </Text>
                        <Text className='w-3/6 text-base pl-3'>
                            {item.specifications[i][1]}
                        </Text>
                    </View>)
            }
        }
    }
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    const [currentIndex, setCurrentIndex] = useState(0);
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index); // Obtiene el índice del primer elemento visible
        }
    }).current;
    return (
        <SafeAreaView>
            <View className="bg-white text-xl h-screen">
                <View className="relative z-10 bg-white h-28 items-center justify-end py-2">
                    <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mb-2'>
                        <Text className='text-right text-xl mr-1'>Ver lista</Text>
                        <Feather name="wind" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View className="p-5 items-center">
                    <Text className=" w-full text-left text-6xl font">
                        {item.nombre}
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View className="p-5 items-center flex">


                        <FlatList
                            className="h-96  flex-1"
                            data={data} // 🔹 Solo tiene dos elementos
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View className='h-96 w-96 items-center justify-center flex'>
                                    <Image source={item.imagen} className="h-full w-full" resizeMode="contain" />
                                </View>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            onViewableItemsChanged={onViewableItemsChanged}
                            viewabilityConfig={viewabilityConfig}

                        />

                        <View className='h-10 w-full gap-2 bg-white flex flex-row justify-center items-center mt-5'>
                            <FontAwesome name="circle" size={24} color={`${currentIndex ? "#adadad" : "#5e5e5e"}`} className="w-1/12 " />
                            <FontAwesome name="circle" size={24} color={`${currentIndex ? "#5e5e5e" : "#adadad"}`} className="w-1/12 " />
                        </View>
                        <View className='w-full items-center h-32 justify-center'>
                            <TouchableOpacity className='w-7/12 bg-blue-500 p-3 rounded-full'>
                                <Text className='text-center text-lg text-white font-semibold'>
                                    Añadir a cotización
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className='gap-3 px-5'>
                            <Text className='text-red-500 text-5xl'>
                                Overview
                            </Text>
                            <Text className='text-black text-base'>
                                {item.overview}
                            </Text>
                            {item.specifications &&
                                <View>
                                    <Text className='text-red-500 text-5xl mb-5'>
                                        Specifications
                                    </Text>
                                    {especificaciones}
                                </View>
                            }
                        </View>

                        {/*<PagerView className='flex-1 h-60' initialPage={0}>
                            <View key="1">
                                <Text>First page</Text>
                                <Text>Swipe ➡️</Text>
                            </View>
                            <View key="2">
                                <Text>Second page</Text>
                            </View>
                            <View key="3">
                                <Text>Third page</Text>
                            </View>
                        </PagerView>*/}
                    </View>
                </ScrollView>



            </View>
        </SafeAreaView>
    )
}