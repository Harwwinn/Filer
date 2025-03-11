import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import { useState, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function pantallaCotizacion() {

    const navigation = useNavigation();

    const anadirACotizacion = () => {
        setEnCarro(enCarro + 1);
        console.log(enCarro);
    }
    const quitarItem = () => {
        setEnCarro(enCarro - 1);
    }

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
                    <Text className=" w-full text-left text-5xl font">
                        Productos Seleccionados
                    </Text>
                    <TouchableOpacity className="w-11/12 bg-filer-blue rounded-full p-2 mt-5" onPress={() => navigation.navigate('pantallaFormularioCotizacion')}>
                        <Text className="text-center text-lg font-semibold text-slate-900">Solicitar Cotización ({global.carrito.length} Productos)</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View className="items-center flex w-full gap-y-4 py-4 ">
                        <View className="w-full max-h-72 bg-filer-grey3 flex-row py-3 px-10 items-center">
                            <View className="h-36 w-36 bg-slate-800">

                            </View>
                            <View className="h-full w-7/12  px-2 py-5">
                                <Text className="text-filer-grey font-semibold text-4xl ">AmAir 300X</Text>
                                <View className="flex flex-row w-8/12 bg-white items-center justify-between rounded-full p-2">
                                    <TouchableOpacity>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <Text>12</Text>
                                    <TouchableOpacity>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity className="bg-white w-5/12 justify-center items-center p-1 mt-2 rounded-full">
                                    <Text className="w-fit text-filer-grey font-semibold">
                                        Eliminar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="w-full h-40 bg-slate-200">
                            <Text>Hola</Text>
                        </View>
                        <View className="w-full h-40 bg-slate-200">
                            <Text>Hola</Text>
                        </View>
                        <View className="w-full h-40 bg-slate-200">
                            <Text>Hola</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}