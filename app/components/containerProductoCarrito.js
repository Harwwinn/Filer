import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import images from '../../assets/images/images';

export default function containerProductoCarrito({ producto, onUpdate }) {
  const [cantidad, setCantidad] = useState(producto.cantidad); // Estado para manejar la cantidad localmente

  const aumentarCantidad = () => {
    const nuevaCantidad = cantidad + 1;
    setCantidad(nuevaCantidad);
    onUpdate(producto.id, nuevaCantidad); // Llamar a onUpdate con nueva cantidad
  };

  const disminuirCantidad = () => {
    if (cantidad > 0) {
      const nuevaCantidad = cantidad - 1;
      setCantidad(nuevaCantidad);
      onUpdate(producto.id, nuevaCantidad);
    }
  };

  const eliminarProducto = () => {
    onUpdate(producto.id); // Llamar a onUpdate para eliminar producto del carrito
  };

  return (
    <View className="w-full max-h-92 bg-filer-grey3 flex-row py-3 px-10 items-center">
      <View className="h-36 w-36 ">
        <Image source={images[producto.imagen]} className="h-full w-full" resizeMode="contain" />
      </View>
      <View className="h-full w-7/12 px-2 py-5 gap-y-1">
        <Text className="text-filer-grey font-semibold text-4xl ">{producto.nombre}</Text>
        <Text>
          • Material: {producto.material}
        </Text>
        <Text className="">
          • Profundidad: {producto.nomDeep}
        </Text>
        <Text>
          • Tamaño: {producto.nomSize}
        </Text>
        <View className="flex flex-row w-8/12 bg-white items-center justify-between rounded-full p-2">
          <TouchableOpacity onPress={disminuirCantidad}>
            <Feather name="minus" size={20} color="#000" />
          </TouchableOpacity>
          <Text>{producto.cantidad}</Text>
          <TouchableOpacity onPress={aumentarCantidad}>
            <Feather name="plus" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-white w-5/12 justify-center items-center p-1 rounded-full" onPress={eliminarProducto}>
          <Text className="w-fit font-semibold text-red-800">
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}