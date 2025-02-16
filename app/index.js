import { View, Text, SafeAreaView, ScrollView, Image, TextInput } from 'react-native';
//import { Image } from 'expo-image';
import React from 'react';
import '../global.css';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import {ContainerProducto} from './components/containerProductoMainPage';


export default function index() {
  return (
    <SafeAreaView>
      <View className="bg-white text-xl h-screen">
        <View className="relative z-10 bg-white h-28 items-center justify-end py-2">
          <View className='w-full flex flex-row justify-end items-center mr-10 mb-2'>
            <Text className='text-right text-xl mr-1'>Ver lista</Text>
            <Feather name="wind" size={24} color="black" />
          </View>
          <View className='border-gray-800 w-11/12 border-2 h-11 rounded-xl relative z-20 flex flex-row justify-center items-center'>
            <TextInput className='text-sm w-11/12' />
            <FontAwesome6 name="magnifying-glass" size={24} color="black" className="w-1/12 " />
          </View>

        </View>
        <ScrollView>
          <View className="p-5 items-center">
            {/*<ContainerProducto titulo={'AmAir 300X'} overview = {'Expanded metal pleat support grid High loft media increases dust holding capacity Excellent primary filter to prevent dust build-up on heating and cooling coils, fans, and ductwork Excellent prefilter for higher efficiency filters Directly interchangeable with disposable panel filters, media pads in metal frames, or permanent filters used in built-up filter banks and side access systems. No modifications are necessary to frames or latches'} imagen={images['amair300x']}/>*/}
            <View className="max-w-xl w-11/12 bg-white h-44 flex flex-row mb-6">
              <View className="w-5/12 h-full p-2">
                <Image source={require('../assets/images/amair300x.png')} className='h-full w-full object-contain' />
              </View>
              <View className="flex flex-col w-7/12 bg-white overflow-hidden">
                <Text className="text-3xl break-normal">AmAir 300X</Text>
                <Text className="text-red-500 text-base mb-2">Product overview</Text>
                <Text className="break-all h-20 text-xs">Expanded metal pleat support grid
                  High loft media increases dust holding capacity
                  Excellent primary filter to prevent dust build-up on heating and cooling coils, fans, and ductwork
                  Excellent prefilter for higher efficiency filters
                  Directly interchangeable with disposable panel filters, media pads in metal frames, or permanent filters used in built-up filter banks and side access systems. No modifications are necessary to frames or latches </Text>
                <Text className="text-xs bottom-0 absolute w-full z-10 bg-white">see more...</Text>
              </View>
            </View>
            <View className="max-w-xl w-11/12 bg-white h-44 flex flex-row mb-6">
              <View className="w-5/12 h-full p-2">
                <Image source={require('../assets/images/amairht.png')} className='h-full w-full object-contain' />
              </View>
              <View className="flex flex-col w-7/12 bg-white overflow-hidden">
                <Text className="text-3xl break-normal">AmAir HT</Text>
                <Text className="text-red-500 text-base mb-2">Product overview</Text>
                <Text className="break-all h-20 text-xs">Rated at 500°F
                  Ultra-fine high loft microglass media
                  Aluminized steel U-channel frame
                  Available in 2″ and 4″ depths
                  MERV 8</Text>
                <Text className="text-xs bottom-0 absolute w-full z-10 bg-white">see more...</Text>
              </View>
            </View>
            <View className="max-w-xl w-11/12 bg-white h-44 flex flex-row mb-6">
              <View className="w-5/12 h-full p-2">
                <Image source={require('../assets/images/amair300x.png')} className='h-full w-full object-contain' />
              </View>
              <View className="flex flex-col w-7/12 bg-white overflow-hidden">
                <Text className="text-3xl break-normal">AmerSeal Cube Filters</Text>
                <Text className="text-red-500 text-base mb-2">Product overview</Text>
                <Text className="break-all h-20 text-xs">Extremely low pressure drop with MERV 8 efficiency
                  High dust holding capacity for long service life
                  Self-sealing design and tapered pockets provide fast, easy installation</Text>
                <Text className="text-xs bottom-0 absolute w-full z-10 bg-white">see more...</Text>
              </View>
            </View>
            <View className="max-w-xl w-11/12 bg-white h-44 flex flex-row mb-6">
              <View className="w-5/12 h-full p-2">
                <Image source={require('../assets/images/amair300x.png')} className='h-full w-full object-contain' />
              </View>
              <View className="flex flex-col w-7/12 bg-white overflow-hidden">
                <Text className="text-3xl break-normal">VariCel VXL</Text>
                <Text className="text-red-500 text-base mb-2">Product overview</Text>
                <Text className="break-all h-20 text-xs">50% more media area provides greater airflow capacity and low resistance
                  Maximum dust holding capacity extends the life of the filter, minimizing operating costs
                  Available in MERV 15, MERV 14, MERV 13, and MERV 11 efficiencies • Excellent performance in difficult operating conditions  </Text>
                <Text className="text-xs bottom-0 absolute w-full z-10 bg-white">see more...</Text>
              </View>
            </View>
            <View className="max-w-xl w-11/12 bg-white h-44 flex flex-row mb-6">
              <View className="w-5/12 h-full p-2">
                <Image source={require('../assets/images/amair300x.png')} className='h-full w-full object-contain' />
              </View>
              <View className="flex flex-col w-7/12 bg-white overflow-hidden">
                <Text className="text-3xl break-normal">AmAir 300X</Text>
                <Text className="text-red-500 text-base mb-2">Product overview</Text>
                <Text className="break-all h-20 text-xs">Expanded metal pleat support grid
                  High loft media increases dust holding capacity
                  Excellent primary filter to prevent dust build-up on heating and cooling coils, fans, and ductwork
                  Excellent prefilter for higher efficiency filters
                  Directly interchangeable with disposable panel filters, media pads in metal frames, or permanent filters used in built-up filter banks and side access systems. No modifications are necessary to frames or latches </Text>
                <Text className="text-xs bottom-0 absolute w-full z-10 bg-white">see more...</Text>
              </View>
            </View>
            <View className="max-w-xl w-11/12 bg-white h-44 flex flex-row mb-6">
              <View className="w-5/12 h-full p-2">
                <Image source={require('../assets/images/amair300x.png')} className='h-full w-full object-contain' />
              </View>
              <View className="flex flex-col w-7/12 bg-white overflow-hidden">
                <Text className="text-3xl break-normal">AmAir 300X</Text>
                <Text className="text-red-500 text-base mb-2">Product overview</Text>
                <Text className="break-all h-20 text-xs">Expanded metal pleat support grid
                  High loft media increases dust holding capacity
                  Excellent primary filter to prevent dust build-up on heating and cooling coils, fans, and ductwork
                  Excellent prefilter for higher efficiency filters
                  Directly interchangeable with disposable panel filters, media pads in metal frames, or permanent filters used in built-up filter banks and side access systems. No modifications are necessary to frames or latches </Text>
                <Text className="text-xs bottom-0 absolute w-full z-10 bg-white">see more...</Text>
              </View>
            </View>
            <View className="max-w-xl w-11/12 bg-white h-44 flex flex-row mb-6">
              <View className="w-5/12 h-full p-2">
                <Image source={require('../assets/images/amair300x.png')} className='h-full w-full object-contain' />
              </View>
              <View className="flex flex-col w-7/12 bg-white overflow-hidden">
                <Text className="text-3xl break-normal">AmAir 300X</Text>
                <Text className="text-red-500 text-base mb-2">Product overview</Text>
                <Text className="break-all h-20 text-xs">Expanded metal pleat support grid
                  High loft media increases dust holding capacity
                  Excellent primary filter to prevent dust build-up on heating and cooling coils, fans, and ductwork
                  Excellent prefilter for higher efficiency filters
                  Directly interchangeable with disposable panel filters, media pads in metal frames, or permanent filters used in built-up filter banks and side access systems. No modifications are necessary to frames or latches </Text>
                <Text className="text-xs bottom-0 absolute w-full z-10 bg-white">see more...</Text>
              </View>
            </View>


          </View>

        </ScrollView>


      </View>
    </SafeAreaView>

  )
}
