import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import '../global.css';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import ContainerProducto from './components/containerProductoMainPage';
import '../assets/carrito';
import PantallaInicio from './pantallas/pantallaInicio';

const data = require('../assets/data.json');


export default function index() {
  const navigation = useNavigation();
  const [pantalla, setPantalla] = useState('inicio');
  return (
    <SafeAreaView className='min-h-screen'>
      {pantalla == "inicio" ? <PantallaInicio setPantalla={setPantalla} />
        : <View className="bg-white text-xl h-screen">
          <View className="relative z-10 bg-white h-28 items-center justify-end py-2">
            <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mb-2' onPress={() => navigation.navigate('pantallaCotizacion')}>
              <Text className='text-right text-xl mr-1'>Ver lista</Text>
              <Feather name="wind" size={24} color="black" />
            </TouchableOpacity>
            <View className='border-gray-800 w-11/12 border-2 h-11 rounded-xl relative z-20 flex flex-row justify-center items-center'>
              <TextInput className='text-sm w-11/12' />
              <FontAwesome6 name="magnifying-glass" size={24} color="black" className="w-1/12 " />
            </View>
          </View>
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
      }


      {/*<View className="bg-white text-xl h-screen">
        <View className="relative z-10 bg-white h-28 items-center justify-end py-2">
          <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mb-2' onPress={() => navigation.navigate('pantallaCotizacion')}>
            <Text className='text-right text-xl mr-1'>Ver lista</Text>
            <Feather name="wind" size={24} color="black" />
          </TouchableOpacity>
          <View className='border-gray-800 w-11/12 border-2 h-11 rounded-xl relative z-20 flex flex-row justify-center items-center'>
            <TextInput className='text-sm w-11/12' />
            <FontAwesome6 name="magnifying-glass" size={24} color="black" className="w-1/12 " />
          </View>
        </View>
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

      </View>*/}
    </SafeAreaView>

  )
}
