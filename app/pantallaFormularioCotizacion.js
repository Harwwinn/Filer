import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Image, TextInput } from 'react-native'
import { useState, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function pantallaFormularioCotizacion() {
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
                    <Text className=" w-full text-left text-5xl font leading-snug">
                        Informacion de contacto
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View className="items-center flex w-full p-5">
                        <Text className='w-full text-slate-500 text-2xl leading-relaxed'>
                            Llene el siguiente formulario para que podamos comunicarnos con usted y realizar la cotización.
                        </Text>
                        <View className='bg-amber-300 h-96 w-full rounded-3xl flex-col p-5 justify-evenly items-center'>
                            <TextInput placeholder='Nombre' className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"/>
                            <TextInput placeholder='Correo electronico' className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"/>
                            <TextInput placeholder='Numero de telefono' className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"/>
                        </View>
                        <TouchableOpacity className='mt-6 border-slate-400 border-2 w-8/12 items-center p-2 rounded-full'>
                            <Text className='text-xl'>
                                ENVIAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}