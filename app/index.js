import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
//import { Image } from 'expo-image';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import '../global.css';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import ContainerProducto from './components/containerProductoMainPage';

const data = require('../assets/data.json');


export default function index() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="bg-white text-xl h-screen">
        <View className="relative z-10 bg-white h-28 items-center justify-end py-2">
          <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mb-2'>
            <Text className='text-right text-xl mr-1'>Ver lista</Text>
            <Feather name="wind" size={24} color="black" />
          </TouchableOpacity>
          <View className='border-gray-800 w-11/12 border-2 h-11 rounded-xl relative z-20 flex flex-row justify-center items-center'>
            <TextInput className='text-sm w-11/12' />
            <FontAwesome6 name="magnifying-glass" size={24} color="black" className="w-1/12 " />
          </View>
        </View>

        {/*<ContainerProducto titulo={'AmAir 300X'} overview={'Expanded metal pleat support grid High loft media increases dust holding capacity Excellent primary filter to prevent dust build-up on heating and cooling coils, fans, and ductwork Excellent prefilter for higher efficiency filters Directly interchangeable with disposable panel filters, media pads in metal frames, or permanent filters used in built-up filter banks and side access systems. No modifications are necessary to frames or latches'} imagen={images['amair300x']} />
            <ContainerProducto titulo={'AmAir HT'} overview={'Expanded metal pleat support grid High loft media increases dust holding capacity Excellent primary filter to prevent dust build-up on heating and cooling coils, fans, and ductwork Excellent prefilter for higher efficiency filters Directly interchangeable with disposable panel filters, media pads in metal frames, or permanent filters used in built-up filter banks and side access systems. No modifications are necessary to frames or latches'} imagen={images['amairht']} />
            <ContainerProducto titulo={'AmAir HT'} overview={'Expanded metal pleat support grid High loft media increases dust holding capacity Excellent primary filter to prevent dust build-up on heating and cooling coils, fans, and ductwork Excellent prefilter for higher efficiency filters Directly interchangeable with disposable panel filters, media pads in metal frames, or permanent filters used in built-up filter banks and side access systems. No modifications are necessary to frames or latches'} imagen={images['amairht']} />
            <ContainerProducto titulo={'AmerSeal Cube Filters'} overview={'Extremely low pressure drop with MERV 8 efficiency High dust holding capacity for long service life Self-sealing design and tapered pockets provide fast, easy installation'} imagen={images['amairht']} />*/}

        <FlatList className="w-full flex-1 p-5" data={data.filtros} keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ContainerProducto
              titulo={item.nombre}
              overview={item.overview}
              imagen={images[item.imagen]}
              onPress={() => navigation.navigate('pantallaProducto', { item })}
            />
          )}
        />

      </View>
    </SafeAreaView>

  )
}
