import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Image, TextInput } from 'react-native'
import { useState, useRef, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
//import PagerView from 'react-native-pager-view';
import { Picker } from '@react-native-picker/picker';

export default function pantallaProducto() {

  const route = useRoute();
  const { item } = route.params;
  const [enCarro, setEnCarro] = useState(0);

  const [mensaje, setMensaje] = useState(<></>);
  const [cantidad, setCantidad] = useState("");

  const navigation = useNavigation();
  const data = [
    { id: '1', imagen: images[item.imagen] },
    { id: '2', imagen: images[item.imagen] }
  ];

  //Estados para manejar el cambio de materiales tamano y profundidad
  const [material, setMaterial] = useState("");
  const [profundidad, setProfundidad] = useState("");
  const [tamano, setTamano] = useState("");
  const [actualSize, setActualSize] = useState('');

  // Obtener las opciones dinámicas según el estado actual
  const materiales = item?.tipo ? Object.keys(item?.tipo) : [];
  const profundidades = material ? Object.keys(item.tipo[material]) : [];
  const tamanos = profundidad ? item.tipo[material][profundidad].tamanos : [];

  //Agregamos useEffect para que cuando se cargue el componente se verifique si ya esta en el carrito
  /*useEffect(() => {
    const productoEnCarrito = global.carrito.find(producto => producto.id === item.id);
    if (productoEnCarrito) {
      setEnCarro(productoEnCarrito.cantidad);
    }
  }, []);*/

  let especificaciones = []
  //Si se tienen especificaciones entonces se ponen en un formato para mostrarlos en la pantalla del producto
  if (item.specifications) {
    for (let i = 0; i < item.specifications.length; i++) {
      if (i == item.specifications.length - 1) {
        especificaciones.push(
          <View key={i} className='flex flex-row border-t-slate-400 border-2 border-b-slate-400 border-x-transparent py-2'>
            <Text className='w-3/6'>
              {item.specifications[i][0]}
            </Text>
            <Text className='w-3/6 text-base pl-3'>
              {item.specifications[i][1]}
            </Text>
          </View>)
      }
      else {
        especificaciones.push(
          <View key={i} className='flex flex-row border-t-slate-400 border-2 border-b-transparent border-x-transparent py-2'>
            <Text className='w-3/6'>
              {item.specifications[i][0]}
            </Text>
            <Text className='w-3/6 text-base pl-3'>
              {item.specifications[i][1]}
            </Text>
          </View>)
      }
    }
  }
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index); // Obtiene el índice del primer elemento visible
    }
  }).current;


  const anadirACotizacion = async () => {
    if (!material || !profundidad || !tamano || !cantidad) {
      setMensaje(<View className='w-11/12 rounded-xl border-red-700 border-2 bg-red-300 p-3 mt-5'>
        <Text className="text-base text-center">No pudes dejar el material, la profundidad, el tamaño o la cantidad en blanco</Text>
      </View>)
    }
    else {
      global.carrito.push({ id: Math.floor(Math.random() * 100000), cantidad: cantidad, nombre: item.nombre, imagen: item.imagen, material: material, profundidad: profundidad, tamano:tamano });
      setMensaje(<View className='w-11/12 rounded-xl border-green-700 border-2 bg-green-300 p-3 mt-5'>
        <Text className="text-base text-center">Se agrego el producto a tu lista de cotización!</Text>
      </View>)
    }


    //Se verifica si esta el producto en el carrito, sino entonces se anade
    /*if (global.carrito.some((producto) => producto?.id == item.id)) {
      //Se busca el prodcuto y se agrega 1 a la cantidad
      global.carrito.find((producto, i) => {
        if (producto.id == item.id) {
          global.carrito[i].cantidad = global.carrito[i].cantidad + 1;
          return true;
        }
      })
    }
    //En caso de que el producto ya este en el carrito entonces se incrementa su cantidad
    else {*/
    //global.carrito.push({ id: item.id, cantidad: 1 })
    /*}
    console.log(global.carrito);*/
  }


  /*const quitarItem = () => {
    setEnCarro(enCarro - 1);
    //Se verifica si esta el producto en el carrito, sino entonces se anade
    if (global.carrito.some((producto) => producto?.id == item.id)) {
      //Se busca el prodcuto y se agrega 1 a la cantidad
      global.carrito.find((producto, i) => {
        if (producto.id == item.id) {
          if (global.carrito[i].cantidad == 1) {
            global.carrito = global.carrito.filter((elemento, j) => j !== i);

          }
          else {
            global.carrito[i].cantidad = global.carrito[i].cantidad - 1;
          }
          return true;
        }
      })
    }
    console.log(global.carrito);
  }*/


  return (
    <SafeAreaView>
      <View className="bg-white text-xl h-screen">
        <View className="relative z-10 bg-white h-28 items-center justify-end py-2">
          <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mb-2' onPress={() => navigation.navigate('pantallaCotizacion')}>
            <Text className='text-right text-xl mr-1 text-filer-blue'>Ver lista</Text>
            <Feather name="wind" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="p-5 items-center">
          <Text className=" w-full text-left text-6xl font">
            {item.nombre}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View className="p-5 items-center flex">


            <FlatList
              className="h-96  flex-1"
              data={data} // 🔹 Solo tiene dos elementos
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className='h-96 w-96 items-center justify-center flex'>
                  <Image source={item.imagen} className="h-full w-full" resizeMode="contain" />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}

            />

            <View className='h-10 w-full gap-2 bg-white flex flex-row justify-center items-center mt-5'>
              <FontAwesome name="circle" size={24} color={`${currentIndex ? "#adadad" : "#5e5e5e"}`} className="w-1/12 " />
              <FontAwesome name="circle" size={24} color={`${currentIndex ? "#5e5e5e" : "#adadad"}`} className="w-1/12 " />
            </View>
            <View className='w-full items-center h-32 justify-center'>
              {/*enCarro ?
                <View className='w-7/12 h-12 bg-filer-blue p-0 rounded-full flex flex-row justify-center items-center overflow-hidden'>
                  <TouchableOpacity className="w-3/12 h-full bg-red-500 items-center justify-center" onPress={quitarItem}>
                    <FontAwesome name="minus" size={20} color='white' />
                  </TouchableOpacity>
                  <View className='justify-center items-center w-6/12 bg-white h-full border-y-black border-y-2'>
                    <Text className='text-center text-lg text-black font-semibold bg-white w-full h-full py-2'>
                      {enCarro}
                    </Text>
                  </View>
                  <TouchableOpacity className="w-3/12 h-full bg-filer-blue items-center justify-center" onPress={anadirACotizacion}>
                    <FontAwesome name="plus" size={20} color='white' />
                  </TouchableOpacity>
                </View> :
                <TouchableOpacity className='w-7/12 h-12 bg-filer-blue p-3 rounded-full' onPress={anadirACotizacion}>
                  <Text className='text-center text-lg text-white font-semibold'>
                    Añadir a cotización
                  </Text>
                </TouchableOpacity>*/}
            </View>
            <View className='gap-3 px-5'>
              <Text className='text-red-500 text-5xl'>
                Overview
              </Text>
              <Text className='text-black text-base'>
                {item.overview}
              </Text>
              {item.specifications &&
                <View>
                  <Text className='text-red-500 text-5xl mb-5'>
                    Specifications
                  </Text>
                  {especificaciones}
                </View>
              }
            </View>
            {mensaje}
            <View className="px-5 justify-center items-center mt-5 w-full gap-y-4">
              <Text className="text-2xl font-bold">
                Realiza Tu Seleccion
              </Text>
              <View className="flex flex-row w-full justify-between ">
                <View className="w-5/12 h-16 px-1 pt-2 overflow-hidden">
                  <View className="w-full h-full border-2 border-black rounded-2xl">
                    <Text className=" bg-white w-14 text-center left-5 -top-4 text-base">
                      Qty.
                    </Text>
                    <TextInput className="z-50 w-full h-full absolute px-2" keyboardType='numeric' value={cantidad} onChangeText={setCantidad} />
                  </View>
                </View>
                <View className="w-7/12 h-16 px-1 pt-2">
                  <View className="w-full h-full border-2 border-black rounded-2xl justify-center">
                    <Text className=" bg-white w-20 text-center left-5 -top-4 text-base absolute">
                      Material
                    </Text>
                    <Picker className="w-full" selectedValue={material} onValueChange={(value) => { setMaterial(value); setProfundidad(""); setTamano("") }}>
                      <Picker.Item label="Seleccione Material" value="" />
                      {materiales.map((mat) => (
                        <Picker.Item key={mat} label={mat} value={mat} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              <View className="flex flex-row w-full justify-between ">
                <View className="w-5/12 h-16 px-1 pt-2 overflow-hidden">
                  <View className="w-full h-full border-2 border-black rounded-2xl justify-center">
                    <Text className=" bg-white w-14 text-center left-5 -top-4 text-base absolute">
                      Deep
                    </Text>
                    <Picker className="w-full" selectedValue={profundidad} onValueChange={(value) => { setProfundidad(value); setTamano("") }}>
                      <Picker.Item label="Seleccione Profundidad" value="" />
                      {profundidades.map((deep) => (
                        <Picker.Item key={deep} label={deep} value={deep} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View className="w-7/12 h-16 px-1 pt-2">
                  <View className="w-full h-full border-2 border-black rounded-2xl justify-center">
                    <Text className=" bg-white w-28 text-center left-5 -top-4 text-base absolute">
                      Actual Deep
                    </Text>
                    <Text className="text-center">{profundidad && item.tipo[material][profundidad].profundidad_real}</Text>
                  </View>
                </View>
              </View>

              <View className="flex flex-row w-full justify-between ">
                <View className="w-5/12 h-16 px-1 pt-2 overflow-hidden">
                  <View className="w-full h-full border-2 border-black rounded-2xl justify-center">
                    <Text className=" bg-white w-32 text-center left-2 -top-4 text-base absolute">
                      Size nom (WxH)
                    </Text>
                    <Picker
                      selectedValue={tamano}
                      onValueChange={(value) => {
                        setTamano(value);
                        const selectedTamano = tamanos.find((t) => t.nominal === value);
                        setActualSize(selectedTamano ? selectedTamano.real : '');
                      }}
                    >
                      <Picker.Item label="Seleccione tamaño" value="" />
                      {tamanos.map((tam) => (
                        <Picker.Item key={tam.nominal} label={tam.nominal} value={tam.nominal} />
                      ))}

                    </Picker>
                  </View>
                </View>
                <View className="w-7/12 h-16 px-1 pt-2">
                  <View className="w-full h-full border-2 border-black rounded-2xl justify-center">
                    <Text className=" bg-white w-28 text-center left-5 -top-4 text-base absolute">
                      Actual Size
                    </Text>
                    <Text className="text-center">{tamano && actualSize}</Text>
                  </View>
                </View>
              </View>

              <View className="w-full h-16  pt-2">
                <View className="w-full h-full border-2 border-black rounded-2xl">

                </View>
              </View>


              <TouchableOpacity className="my-5 bg-filer-blue p-4 rounded-xl" onPress={() => anadirACotizacion()}>
                <Text className="text-white text-lg">
                  CARGAR SELECCION
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>



      </View>
    </SafeAreaView>
  )
}