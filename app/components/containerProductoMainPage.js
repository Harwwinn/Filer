import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function containerProductoMainPage({ onPress, titulo, overview, imagen }) {
    return (
        <TouchableOpacity onPress={onPress} className="max-w-xl w-full flex flex-row mb-6">
            <View className="w-5/12 p-2 flex items-center justify-center">
                {/* Imagen centrada dentro de su contenedor */}
                <Image
                    source={imagen}
                    className="rounded-lg"
                    style={{ width: 180, height: 180 }} // Ajuste del tamaño según preferencia
                    resizeMode="contain"
                />
            </View>

            <View className="flex flex-col w-7/12">
                <Text className="text-xl break-normal">{titulo}</Text>
                <Text className="text-red-500 text-base mb-2">Product overview</Text>

                {/* Ajuste dinámico del contenedor del texto */}
                <View>
                    {Array.isArray(overview) ? (
                        overview.map((linea, index) => (
                            <Text key={index} className="text-xs">
                                {linea}
                            </Text>
                        ))
                    ) : (
                        <Text className="text-xs">{overview}</Text>
                    )}
                </View>

                <Text className="text-xs bottom-0 absolute w-full z-10 bg-white">see more...</Text>
            </View>
        </TouchableOpacity>
    )
}