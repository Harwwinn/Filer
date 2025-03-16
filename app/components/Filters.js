import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const categorias = require('../../assets/categorias.json');

export default function Filters({setFilteredData, productos, searchTerm}) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);


    const filterFiltros = () => {
        let filtered = [...productos];
        if(searchTerm){
            console.log(searchTerm);
        }
        if(selectedCategory){
            filtered = filtered.filter(producto => producto.categoria1 === selectedCategory);
        }

        if(selectedSubCategory){
            filtered = filtered.filter(producto => producto.categoria2 === selectedSubCategory);
        }

        if(selectedSubSubCategory){
            filtered = filtered.filter(producto => producto.categoria3 === selectedSubSubCategory);
        }

        setFilteredData(filtered);
    }

    // Llama a filterFiltros cada vez que cambia el estado
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
        <View className="w-full p-5 border-b-slate-400 border-b-2">
            <Text className="text-xl">Linea</Text>
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
                    <Text className="text-xl">Subcategorías de {selectedCategory}</Text>
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
                    <Text className="text-xl">Subcategorías de {selectedSubCategory}</Text>
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


        </View>
    )
}