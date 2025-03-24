import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import '../global.css';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import images from '../assets/images/images';
import ContainerProducto from './components/containerProductoMainPage';
import '../assets/carrito';
import PantallaInicio from './pantallas/pantallaInicio';
import Filters from './components/Filters';

const categorias = require('../assets/categorias.json');
const data = require('../assets/data.json');
const productos = data.filtros;


export default function index() {
  const navigation = useNavigation();
  const [pantalla, setPantalla] = useState('inicio');
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [filteredData, setFilteredData] = useState(productos);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const filterFiltros = () => {
    let filtered = [...productos];
    const termino = searchTerm.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(producto => producto.nombre.toLowerCase().includes(termino));
    }
    if (selectedCategory) {
      filtered = filtered.filter(producto => producto.categoria1 === selectedCategory);
    }

    if (selectedSubCategory) {
      filtered = filtered.filter(producto => producto.categoria2 === selectedSubCategory);
    }

    if (selectedSubSubCategory) {
      filtered = filtered.filter(producto => producto.categoria3 === selectedSubSubCategory);
    }

    setFilteredData(filtered);
  }

  useEffect(() => {
    filterFiltros();
  }, [selectedCategory, selectedSubCategory, selectedSubSubCategory, searchTerm]);

  const handleCategoryPress = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      setSelectedSubCategory("");
      setSelectedSubSubCategory("");
      setSubcategories([]);
      setSubSubCategories([]);
    } else {
      setSelectedCategory(category);
      setSelectedSubCategory("");
      setSelectedSubSubCategory("");
      setSubcategories(Object.keys(categorias[category] || {}));
      setSubSubCategories([]);
    }

    filterFiltros();
  };

  const handleSubCategoryPress = (subCategory) => {
    if (selectedSubCategory === subCategory) {
      setSelectedSubCategory("");
      setSelectedSubSubCategory("");
      setSubSubCategories([]);
    } else {
      setSelectedSubCategory(subCategory);
      setSelectedSubSubCategory("");
      setSubSubCategories(Object.keys(categorias[selectedCategory]?.[subCategory] || {}));
    }
    filterFiltros();
  };

  const handleSubSubCategoryPress = (subCategory) => {
    if (selectedSubSubCategory === subCategory) {
      setSelectedSubSubCategory("");
    } else {
      setSelectedSubSubCategory(subCategory);
    }
    filterFiltros();
  };

  return (
    <SafeAreaView className='min-h-screen'>
      {pantalla == "inicio" ? <PantallaInicio setPantalla={setPantalla} />
        :
        <ScrollView>
          <View className="bg-white text-xl min-h-screen">
            <View className="relative z-10 bg-white h-40 items-center justify-end py-2">
              <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mb-2' onPress={() => navigation.navigate('pantallaCotizacion')}>
                <Text className='text-right text-xl mr-1 text-filer-blue'>Ver Lista</Text>
                <Feather name="wind" size={24} color="#0077bf" />
              </TouchableOpacity>
              <View className='border-gray-800 w-11/12  h-11 rounded-xl relative z-20 flex flex-row justify-center items-center bg-filer-blue2'>
                <TextInput className='text-sm w-11/12 text-black' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} placeholder='Escribe el modelo del filtro'/>
                <FontAwesome6 name="magnifying-glass" size={24} color="#0077bf" className="w-1/12 " />
              </View>
              <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mt-2' onPress={() => setMostrarCategorias(!mostrarCategorias)}>
                <Text className='text-right text-xl mr-1 text-filer-blue'>Filtrar por categoria</Text>
                <Feather name="sliders" size={24} color="#0077bf" />
              </TouchableOpacity>
            </View>
            {mostrarCategorias &&
              <View className="w-full p-5 border-b-filer-blue2 border-b-2">
                <Text className="text-xl text-filer-blue">Linea</Text>
                <View className="w-full flex-row gap-x-2 gap-y-2 flex-wrap py-2">
                  {Object.keys(categorias).map((category) => (
                    <TouchableOpacity
                      key={category}
                      className={`border-filer-blue border-2 p-1 rounded-full ${selectedCategory === category && 'bg-filer-blue'}`}
                      onPress={() => handleCategoryPress(category)}
                    >
                      <Text className={`text-base ${selectedCategory === category ? 'text-white' : 'text-black'} `}> {category} </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {subcategories.length > 0 && (
                  <>
                    <Text className="text-xl text-filer-blue">Subcategorías de {selectedCategory}</Text>
                    <View className="w-full flex-row gap-x-2 gap-y-2 flex-wrap py-2">
                      {subcategories.map((subcategory) => (
                        <TouchableOpacity
                          key={subcategory}
                          className={`border-filer-blue border-2 p-1 rounded-full ${selectedSubCategory === subcategory && 'bg-filer-blue'}`}
                          onPress={() => handleSubCategoryPress(subcategory)}
                        >
                          <Text className={`text-base ${selectedSubCategory === subcategory ? 'text-white' : 'text-black'} `}> {subcategory} </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}

                {subSubCategories.length > 0 && (
                  <>
                    <Text className="text-xl text-filer-blue">Subcategorías de {selectedSubCategory}</Text>
                    <View className="w-full flex-row gap-x-2 gap-y-2 flex-wrap py-2">
                      {subSubCategories.map((subcategory) => (
                        <TouchableOpacity
                          key={subcategory}
                          className={`border-filer-blue border-2 p-1 rounded-full ${selectedSubSubCategory === subcategory && 'bg-filer-blue'}`}
                          onPress={() => handleSubSubCategoryPress(subcategory)}
                        >
                          <Text className={`text-base ${selectedSubSubCategory === subcategory ? 'text-white' : 'text-black'} `}> {subcategory} </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}


              </View>}
            {/*<FlatList className="w-full flex-1 p-5" data={filteredData} keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ContainerProducto
                  titulo={item.nombre}
                  overview={item.overview}
                  imagen={images[item.imagen]}
                  onPress={() => navigation.navigate('pantallaProducto', { item })}
                />
              )}
            />*/}
            <View className="w-full flex-1 p-5">
              {filteredData.map((item, index) => (
                <ContainerProducto
                  key={index.toString()} // Asigna una clave única
                  titulo={item.nombre}
                  overview={item.overview}
                  imagen={images[item.imagen]}
                  onPress={() => navigation.navigate('pantallaProducto', { item })}
                />
              ))}
            </View>

          </View>
        </ScrollView>
      }
    </SafeAreaView>

  )
}
