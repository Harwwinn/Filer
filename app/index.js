import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import '../global.css';
import '../assets/carrito';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// Tus componentes e importaciones
import images from '../assets/images/images';
// Nota: Ya no usamos ContainerProducto aquí, renderizamos las tarjetas directamente
import PantallaInicio from './pantallas/pantallaInicio';

// Carga de datos
const categoriasData = require('../assets/categorias.json');
const data = require('../assets/data.json');
const productos = data.filtros;

export default function Index() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const [pantalla, setPantalla] = useState('inicio');

  const [selectionPath, setSelectionPath] = useState({
    level1: null,
    level2: null,
  });

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const ALLOWED_LEVEL1 = "HVAC Filtration";
  const ALLOWED_LEVEL2 = "Planos";

  // Efecto para filtrar los productos
  useEffect(() => {
    let results = [];
    const termino = searchTerm.toLowerCase();

    // Lógica de filtrado basado en la navegación
    if (selectionPath.level2 === 'Planos') {
      results = productos.filter(p => p.categoria1 === selectionPath.level1 && p.categoria2 === selectionPath.level2);
    }
    
    // Lógica de búsqueda por texto. Filtra los resultados actuales o toda la lista de productos
    if (searchTerm) {
      const sourceData = results.length > 0 ? results : productos;
      results = sourceData.filter(producto => 
        producto.nombre.toLowerCase().includes(termino) ||
        producto.categoria3?.toLowerCase().includes(termino) // Busca también en sub-subcategoría si existe
      );
    }

    setFilteredData(results);

  }, [selectionPath, searchTerm]);


  const handleLevel1Select = (category) => {
    if (category === ALLOWED_LEVEL1) {
      setSearchTerm(""); // Limpiar búsqueda al navegar
      setSelectionPath({ level1: category, level2: null });
    }
  };

  const handleLevel2Select = (subCategory) => {
    if (subCategory === ALLOWED_LEVEL2) {
      setSearchTerm(""); // Limpiar búsqueda al navegar
      setSelectionPath({ ...selectionPath, level2: subCategory });
    }
  };
  
  const goBack = () => {
    setSearchTerm(""); // Limpiar búsqueda al retroceder
    if (selectionPath.level2) {
      setSelectionPath({ ...selectionPath, level2: null });
    } else if (selectionPath.level1) {
      setSelectionPath({ level1: null, level2: null });
    }
  };

  // --- Renderizado Condicional ---
  const renderContent = () => {
    // Si hay un término de búsqueda, mostramos los resultados de la búsqueda
    if (searchTerm && filteredData.length > 0) {
      return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text className="text-lg text-gray-600 mb-4 px-2">Resultados de la búsqueda para "{searchTerm}":</Text>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => navigation.navigate('pantallaProducto', { item })}
              className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
            >
              <View className="flex-row items-center">
                <Image source={images[item.imagen]} className="w-24 h-24 mr-4 rounded-md" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-filer-blue">{item.nombre}</Text>
                  <Text className="text-sm text-gray-600 mt-1">{item.descripcion_breve}</Text>
                  <Text className="text-xs text-gray-400 mt-2">
                    {item.categoria1} {' > '} {item.categoria2} {' > '} {item.categoria3}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }

    // Nivel 3: Mostrar la lista de productos de la categoría "Planos"
    if (selectionPath.level2 === 'Planos') {
      return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => navigation.navigate('pantallaProducto', { item })}
              className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
            >
              <View className="flex-row items-center">
                <Image source={images[item.imagen]} className="w-24 h-24 mr-4 rounded-md" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-filer-blue">{item.nombre}</Text>
                  <Text className="text-sm text-gray-600 mt-1">{item.descripcion_breve}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }

    // Nivel 2: Mostrar subcategorías (Planos, Pleated, etc.)
    if (selectionPath.level1) {
      const subCategories = categoriasData[selectionPath.level1];
      return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {Object.keys(subCategories).map((subCategory) => {
            const isAllowed = subCategory === ALLOWED_LEVEL2;
            const item = subCategories[subCategory];
            return (
              <TouchableOpacity
                key={subCategory}
                disabled={!isAllowed}
                onPress={() => handleLevel2Select(subCategory)}
                className={`bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 ${!isAllowed && 'opacity-40'}`}
              >
                <View className="flex-row items-center">
                  <Image source={images[item.imagen]} className="w-24 h-24 mr-4 rounded-md" />
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-filer-blue">{subCategory}</Text>
                    <Text className="text-sm text-gray-600 mt-1">{item.descripcion}</Text>
                  </View>
                   {!isAllowed && (
                      <View className="absolute top-2 right-2">
                          <FontAwesome6 name="lock" size={20} color="#6b7280" />
                      </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }

    // *** CAMBIO CLAVE ***
    // Nivel 1: Mostrar categorías principales con layout vertical a pantalla completa
    return (
        <View className="flex-1 justify-around p-4">
            {Object.keys(categoriasData).map((category) => {
                const isAllowed = category === ALLOWED_LEVEL1;
                return (
                    <TouchableOpacity
                        key={category}
                        disabled={!isAllowed}
                        onPress={() => handleLevel1Select(category)}
                        // flex-1 hace que cada botón intente ocupar el mismo espacio vertical
                        className={`flex-1 justify-center items-center bg-white rounded-lg shadow-md m-2 border-2 ${isAllowed ? 'border-filer-blue' : 'border-gray-300'} ${!isAllowed && 'opacity-40'}`}
                    >
                        <Text className={`text-xl font-bold ${isAllowed ? 'text-filer-blue' : 'text-gray-500'}`}>{category}</Text>
                        {!isAllowed && <FontAwesome6 name="lock" size={24} color="#6b7280" className="mt-2" />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
  };


  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
        {pantalla === "inicio" ? (
          <View className="flex-1">
            <PantallaInicio setPantalla={setPantalla} />
          </View>
        ) : (
          <View className="flex-1">
            {/* HEADER */}
            <View className="bg-white items-center justify-end py-2 border-b border-gray-200"
  style={{ paddingTop: insets.top }}>
              <View className="w-full flex-row justify-between items-center px-4 mb-2">
                {selectionPath.level1 && (
                  <TouchableOpacity onPress={goBack} className="flex-row items-center">
                    <Feather name="chevron-left" size={24} color="#0077bf" />
                    <Text className="text-lg text-filer-blue ml-1">Volver</Text>
                  </TouchableOpacity>
                )}
                {!selectionPath.level1 && <View />}
                <TouchableOpacity className='flex-row justify-end items-center' onPress={() => navigation.navigate('pantallaCotizacion')}>
                  <Text className='text-right text-lg mr-1 text-filer-blue'>Ver Lista</Text>
                  <Feather name="wind" size={24} color="#0077bf" />
                </TouchableOpacity>
              </View>

              {/* BUSCADOR */}
              <View className='border-gray-800 w-11/12 h-11 rounded-xl relative flex-row items-center bg-gray-100 mt-2'>
                <TextInput
                  className='text-sm w-10/12 text-black pl-4'
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  placeholderTextColor="#0077bf"
                  placeholder='Busca un filtro por nombre o modelo...'
                />
                <FontAwesome6 name="magnifying-glass" size={20} color="#0077bf" className="absolute right-4" />
              </View>
            </View>

            {/* CONTENIDO DINÁMICO */}
            <View className="flex-1">
              {renderContent()}
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}