import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Image, Alert } from 'react-native'
import { useState, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import ContainerProductoCarrito from './components/containerProductoCarrito';
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function pantallaCotizacion() {

  const navigation = useNavigation();
  
  // Estado del carrito inicial (global.carrito)
  const [carrito, setCarrito] = useState([...global.carrito]); // Clonamos global.carrito para manejar el estado local

  // Función para manejar la actualización del carrito
  const actualizarCarrito = (id, nuevaCantidad) => {
    if (nuevaCantidad !== undefined) {
      // Actualizar la cantidad si nuevaCantidad está definida
      setCarrito(prevCarrito =>
        prevCarrito.map(producto => (producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto))
      );
    } else {
      // Si nuevaCantidad es undefined, eliminar producto
      setCarrito(prevCarrito => prevCarrito.filter(producto => producto.id !== id));
    }

    // Sincronizar también el array global
    global.carrito = nuevaCantidad !== undefined
      ? carrito.map(producto => (producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto))
      : carrito.filter(p => p.id !== id);
  };

  const anadirACotizacion = () => {
    setEnCarro(enCarro + 1);
    console.log(enCarro);
  }
  const quitarItem = () => {
    setEnCarro(enCarro - 1);
  }

  const handleSolicitarCotizacion = () => {
    if (global.carrito.length === 0) {
      Alert.alert("Error al solicitar cotizacion", "Debe agregar productos a su carrito antes de poder solicitar una cotización")
    }
    else {
      navigation.navigate("pantallaFormularioCotizacion", { carrito: global.carrito });
    }
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
          <TouchableOpacity className="w-11/12 bg-filer-blue rounded-full p-2 mt-5" onPress={handleSolicitarCotizacion}>
            <Text className="text-center text-lg font-semibold text-white">Solicitar Cotización ({global.carrito.length} Productos)</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View className="items-center flex w-full gap-y-4 py-4 ">
            {/* Renderizar productos */}
            {global.carrito.map((producto) => (<ContainerProductoCarrito producto={producto} onUpdate={actualizarCarrito} key={producto.id}/>))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}