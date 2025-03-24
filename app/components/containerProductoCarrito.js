import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function containerProductoCarrito({producto}) {
  return (
    <View className="w-full max-h-92 bg-filer-grey3 flex-row py-3 px-10 items-center">
      <View className="h-36 w-36 bg-slate-800">

      </View>
      <View className="h-full w-7/12 px-2 py-5 gap-y-1">
        <Text className="text-filer-grey font-semibold text-4xl ">{producto.nombre}</Text>
        <Text>
          • Material: {producto.material}
        </Text>
        <Text className="">
          • Profundidad: {producto.profundidad}
        </Text>
        <Text>
          • Tamaño: {producto.tamano}
        </Text>
        <View className="flex flex-row w-8/12 bg-white items-center justify-between rounded-full p-2">
          <TouchableOpacity>
            <Text>-</Text>
          </TouchableOpacity>
          <Text>{producto.cantidad}</Text>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-white w-5/12 justify-center items-center p-1 rounded-full">
          <Text className="w-fit font-semibold text-red-800">
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}