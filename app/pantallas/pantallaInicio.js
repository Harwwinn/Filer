import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '../../assets/images/images';

export default function pantallaInicio({ setPantalla }) {
	return (
		<View className="w-full h-full">
			<TouchableOpacity activeOpacity={1} onPress={() => setPantalla("home")}>
				<Image source={images['fondoPrincipal']} className='h-full w-full' resizeMode='fit' />
				<View className='bg-filer-grey2 opacity-80 w-full absolute h-full '>
				</View>
				<View className='w-full absolute h-full justify-start items-center py-2 px-7 opacity-100'>
					<View className='h-1/4 w-full  items-center justify-center gap-y-1 '>
						<Image source={images['filerLogo']} className='h-2/5 w-2/5' resizeMode='contain' />
						<Text className='text-xl text-filer-blue font-black  md:text-xl'>TRANSFORMADO EL AIRE QUE RESPIRAS</Text>
					</View>
					<View className='h-1/4 w-full '>
						<Text className='text-lg font-normal'>
							En FILER somos distribuidores en México de filtros de aire <Text className="font-black">AAF® International</Text> en México. Contamos con ingenieros especializados para ayudarle a encontrar el producto o solución adecuado a sus requerimientos de filtración de aire para tanto par confort como para proceso.
						</Text>
					</View>
					<View className='h-1/4 w-full  items-center justify-start gap-y-4  py-2'>
						<Text className='text-xl text-black font-semibold  md:text-2xl'>American Air Filter International</Text>
						<Image source={images['aafLogo']} className='h-2/5 w-2/5' resizeMode='contain' />
						<Text className='text-xl text-red-700 font-black  md:text-xl'>BRINGING CLEAN AIR TO LIFE.</Text>
					</View>
					<View className='h-1/4 w-full items-center justify-between px-8 py-2 gap-y-10'>
						<Text className='text-lg font-semibold mt-5'>
							Presiona la pantalla para entrar a la app
						</Text>
						<Text className='text-lg font-normal'>
							© 2025 American Air Filter Company, Inc. & Filer Hvac&r Solutions
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	)
}