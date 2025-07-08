import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Image, TextInput, Platform, StyleSheet, Keyboard } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomPickerIOS from './components/CustomPickerIOS'; // Asegúrate que la ruta sea correcta
import { Linking as ExpoLinking } from 'expo-linking';
import { /*...,*/ Linking} from 'react-native';

export default function PantallaProducto() {
  const route = useRoute();
  const { item } = route.params;
 // console.log("ITEM RECIBIDO:", JSON.stringify(item, null, 2));

  const [mensaje, setMensaje] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const navigation = useNavigation();
  const data = [{ id: '1', imagen: images[item.imagen] }];

  // Estados del formulario
  const [material, setMaterial] = useState("");
  const [profundidad, setProfundidad] = useState("");
  const [tamano, setTamano] = useState("");
  const [actualSize, setActualSize] = useState('');

  // Refs
  const materialPickerRef = useRef(null);
  const deepPickerRef = useRef(null);
  const sizePickerRef = useRef(null);

  const closeAllPickers = () => {
      materialPickerRef.current?.dismiss();
      deepPickerRef.current?.dismiss();
      sizePickerRef.current?.dismiss();
  };


  // Lógica para llenar los pickers
  const materiales = item?.tipo ? Object.keys(item.tipo) : [];
  const profundidades = (material && item.tipo[material]) ? Object.keys(item.tipo[material]) : [];
  const tamanos = (profundidad && item.tipo[material]?.[profundidad]?.tamanos) ? item.tipo[material][profundidad].tamanos : [];

  let especificaciones = [];
  if (item.specifications) {
    for (let i = 0; i < item.specifications.length; i++) {
        if (i === item.specifications.length - 1) {
            especificaciones.push(
                <View key={i} className='flex-row border-t-slate-400 border-2 border-b-slate-400 border-x-transparent py-2'>
                    <Text className='w-3/6'>{item.specifications[i][0]}</Text>
                    <Text className='w-3/6 text-base pl-3'>{item.specifications[i][1]}</Text>
                </View>
            );
        } else {
            especificaciones.push(
                <View key={i} className='flex-row border-t-slate-400 border-2 border-b-transparent border-x-transparent py-2'>
                    <Text className='w-3/6'>{item.specifications[i][0]}</Text>
                    <Text className='w-3/6 text-base pl-3'>{item.specifications[i][1]}</Text>
                </View>
            );
        }
    }
  }

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const anadirACotizacion = () => {
    if (!material || !profundidad || !tamano || !cantidad || parseInt(cantidad, 10) === 0) {
      setMensaje(
        <View className='w-11/12 rounded-xl border-red-700 border-2 bg-red-300 p-3 mt-5'>
          <Text className="text-base text-center">Llene todos los campos antes de cargar su selección</Text>
        </View>
      );
      return;
    }
    
    // Sintaxis para JavaScript puro
    if (!Array.isArray(global.carrito)) {
      global.carrito = [];
    }

    // Sintaxis para JavaScript puro
    global.carrito.push({
      id: Math.floor(Math.random() * 100000),
      cantidad: parseInt(cantidad, 10),
      filtro: item.nombre,
      imagen: item.imagen,
      material: material,
      nomDeep: profundidad,
      realDeep: item.tipo[material][profundidad].profundidad_real,
      nomSize: tamano,
      realSize: actualSize
    });

    setMensaje(
        <View style={{ elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3.84 }} className='w-11/12 flex-row items-center rounded-xl bg-green-100 p-4 mt-5 border border-green-500'>
          <Feather name="check-circle" size={24} color="#15803d" />
          <Text className="text-base text-green-900 ml-3 font-semibold">¡Agregado a tu cotización!</Text>
        </View>
      );

      setCantidad('');
      setMaterial('');
      setProfundidad('');
      setTamano('');
      setActualSize('');

      setTimeout(() => {
        setMensaje(null);
      }, 3000); // 3000 ms = 3 segundos
    };

  // --- NUEVA FUNCIÓN para abrir la ficha técnica ---
  // Asegúrate de que la importación sea así:


// ... en tu componente ...

  const abrirFichaTecnica = async () => {
    const url = item.ficha_tecnica_url;
    console.log("URL a abrir:", url);

    if (!url) {
      alert("Ficha técnica no disponible.");
      return;
    }

    try {
      // canOpenURL a veces puede ser poco fiable.
      // Un enfoque más directo es intentar abrirla y capturar el error.
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error al abrir la URL:", error);
      alert("No se pudo abrir la ficha técnica. Asegúrate de tener un navegador web instalado.");
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* --- HEADER CON BOTÓN VOLVER Y VER LISTA --- */}
        <View className="flex-row justify-between items-center bg-white px-5 py-2">
          <TouchableOpacity className='flex-row items-center' onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={28} color="#0077bf" />
            <Text className='text-lg text-filer-blue ml-1'>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center' onPress={() => navigation.navigate('pantallaCotizacion')}>
            <Text className='text-right text-lg mr-1 text-filer-blue'>Ver Lista</Text>
            <Feather name="wind" size={24} color="#0077bf" />
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView
          extraScrollHeight={100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 50 }}
          enableResetScrollToCoords={false}
        >
          <View>
            <View className="p-5">
              <Text className="w-full text-left text-4xl font-semibold">{item.nombre}</Text>
            </View>

            {/* --- IMAGEN ÚNICA (SIN SLIDER) --- */}
            <View className="px-5 items-center my-4">
              {/* 
                Contenedor directo para la imagen.
                - w-full: Ocupa todo el ancho disponible.
                - bg-gray-100: (Opcional) Fondo gris claro para depurar y ver el área del contenedor.
                - rounded-lg: Bordes redondeados.
                - overflow-hidden: Asegura que la imagen no se salga de los bordes redondeados.
              */}
              <View className="w-full bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: 1 }}>
                <Image 
                  source={images[item.imagen] || images.placeholder} // Usamos un fallback por seguridad
                  className="w-full h-full" 
                  resizeMode="contain" 
                />
              </View>
            </View>

            {/** --- DETALLES DEL PRODUCTO */}
            <View className='gap-3 px-5'>
              <View className="pt-10">
                <Text className='text-filer-blue text-5xl'>Overview</Text>
              </View>
              <View>
                {Array.isArray(item.overview) ? (
                  item.overview.map((linea, index) => <Text key={index} className="text-xl">{linea}</Text>)
                ) : (
                  <Text className="text-xl">{item.overview}</Text>
                )}
              </View>
              {/* --- SECCIÓN ESPECIFICACIONES (CON IMAGEN) --- */}
              {item.imagen_specs && (
                <View>
                  <Text className='text-filer-blue text-4xl font-bold mb-4'>Especificaciones</Text>
                  <Image 
                    source={images[item.imagen_specs]} 
                    className="w-full" 
                    resizeMode="contain" 
                    style={{ height: undefined, aspectRatio: 1.5 }} // Ajusta el aspect ratio según tu imagen
                  />
                </View>
              )}

              {/* BOTÓN DE FICHA TÉCNICA */}
              {item.ficha_tecnica_url && (
                <View className="mt-8">
                  <TouchableOpacity 
                    className="border-2 border-filer-blue p-4 rounded-xl w-full items-center" 
                    onPress={abrirFichaTecnica}
                  >
                    <Text className="text-filer-blue text-lg font-bold">VER FICHA TÉCNICA (PDF)</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            <View className="px-5 justify-center items-center mt-10 w-full gap-y-5">
              <Text className="text-2xl font-bold">Realiza Tu Selección</Text>
              {mensaje}
              
              <View className="w-full">
                <Text className="text-base text-gray-600 mb-1 ml-2">Cantidad</Text>
                <View className="w-full border-2 border-black rounded-2xl">
                  <TextInput 
                    className="text-lg px-4 py-3" 
                    keyboardType='numeric' 
                    value={String(cantidad)}
                    onChangeText={setCantidad} 
                    placeholder="Seleccione una cantidad para el producto"
                    placeholderTextColor="#9ca3af"
                    onFocus={closeAllPickers}
                    textAlignVertical="center"
                  />
                </View>
              </View>

              {/*Campo material */}
              <View className="w-full">
                <Text className="text-base text-gray-600 mb-1 ml-2">Material</Text>
                <View className="h-14 justify-center rounded-2xl border-2 border-black bg-white">
                  <CustomPickerIOS
                    ref={materialPickerRef}
                    onOpen={() => Keyboard.dismiss()}
                    selectedValue={material}
                    onValueChange={(value) => { setMaterial(value); setProfundidad(""); setTamano(""); }}
                    items={materiales.map(mat => ({ label: mat, value: mat }))}
                    placeholder="Seleccione Material..."
                  />
                </View>
              </View>

              {/*Campo Profundidad */}
              <View className="flex-row w-full justify-between items-start">
                <View className="w-[48%]">
                  <Text className="text-base text-gray-600 mb-1 ml-2">Deep</Text>
                  <View className={[
          'h-14 justify-center rounded-2xl border-2', // Clases base
          !material ? 'bg-gray-100 border-gray-300' : 'bg-white border-black' // Clases condicionales
        ].join(' ')}>
                    <CustomPickerIOS
                      ref={deepPickerRef}
                      onOpen={() => Keyboard.dismiss()}
                      selectedValue={profundidad}
                      onValueChange={(value) => { setProfundidad(value); setTamano(""); }}
                      items={profundidades.map(deep => ({ label: `${deep}"`, value: deep }))}
                      enabled={!!material}
                      placeholder="Seleccione..."
                    />
                  </View>
                </View>
                <View className="w-[48%]">
                  <Text className="text-base text-gray-600 mb-1 ml-2">Actual Deep</Text>
                  <View className="h-14 border-2 border-gray-300 bg-gray-100 rounded-2xl justify-center">
                    <Text className="text-center text-lg text-gray-700">
                      {/* Se añade el símbolo " solo si hay un valor que mostrar */}
                      {(profundidad && `${item.tipo[material]?.[profundidad]?.profundidad_real}"`) || '-'}
                    </Text>
                  </View>
                </View>
              </View>

              {/*Campo Size */}
              <View className="flex-row w-full justify-between items-start">
                <View className="w-[48%]">
                  <Text className="text-base text-gray-600 mb-1 ml-2">Size (WxH)</Text>
                  <View className={[
          'h-14 justify-center rounded-2xl border-2', // Clases base
          !profundidad ? 'bg-gray-100 border-gray-300' : 'bg-white border-black' // Clases condicionales
        ].join(' ')}>
                    <CustomPickerIOS
                      ref={sizePickerRef}
                      onOpen={() => Keyboard.dismiss()}
                      selectedValue={tamano}
                      onValueChange={(value) => {
                        setTamano(value);
                        const selectedTamano = tamanos.find((t) => t.nominal === value);
                        setActualSize(selectedTamano ? selectedTamano.real : '');
                      }}
                      items={tamanos.map(tam => ({ label: `${tam.nominal}"`, value: tam.nominal }))}
                      enabled={!!profundidad}
                      placeholder="Seleccione..."
                    />
                  </View>
                </View>
                <View className="w-[48%]">
                  <Text className="text-base text-gray-600 mb-1 ml-2">Actual Size</Text>
                  <View className="h-14 border-2 border-gray-300 bg-gray-100 rounded-2xl justify-center">
                      <Text className="text-center text-lg text-gray-700">{actualSize ? `${actualSize}"` : '-'}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity className="my-5 bg-filer-blue p-4 rounded-xl w-full items-center" onPress={anadirACotizacion}>
                <Text className="text-white text-lg font-bold">CARGAR SELECCIÓN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
});