import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import React from 'react';

export default function PantallaFormularioCotizacion() {
    const [razonSocial, setRazonSocial] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');

    // Función que maneja el envío del formulario
    const enviarFormulario = async () => {
        // Crear un array de objetos (en este caso vacío, puedes rellenarlo según tus necesidades)
        const itemsArray = items.map(item => ({
            name: item.name,
            quantity: item.quantity,
        }));

        const data = {
            items: itemsArray,
            email: correo,
            name: nombre,
            phone: telefono,
            company: razonSocial
        };

        try {
            // Enviar la solicitud POST al backend
            const response = await fetch('http://localhost:5000/send-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('¡Cotización enviada con éxito!');
            } else {
                setMessage(`Error: ${result.error}`);
            }
        } catch (error) {
            setMessage('Error al enviar el formulario. Intenta nuevamente.');
            console.error('Error al enviar el formulario:', error);
        }
    };

    return (
        <SafeAreaView>
            <View className="bg-white text-xl h-screen">
                <View className="relative z-10 bg-white h-28 items-center justify-end py-2">
                    <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mb-2'>
                        <Text className='text-right text-xl mr-1'>Ver lista</Text>
                    </TouchableOpacity>
                </View>
                <View className="p-5 items-center">
                    <Text className=" w-full text-left text-5xl font leading-snug">
                        Información de contacto
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View className="items-center flex w-full p-5">
                        <Text className='w-full text-slate-500 text-2xl leading-relaxed'>
                            Llene el siguiente formulario para que podamos comunicarnos con usted y realizar la cotización.
                        </Text>
                        <View className='bg-filer-blue w-full rounded-3xl flex-col p-5 justify-evenly items-center gap-y-8 py-14'>
                            <TextInput
                                placeholder='Razón social'
                                value={razonSocial}
                                onChangeText={setRazonSocial}
                                className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"
                            />
                            <TextInput
                                placeholder='Nombre'
                                value={nombre}
                                onChangeText={setNombre}
                                className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"
                            />
                            <TextInput
                                placeholder='Correo electrónico'
                                value={correo}
                                onChangeText={setCorreo}
                                className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"
                            />
                            <TextInput
                                placeholder='Número de teléfono'
                                value={telefono}
                                onChangeText={setTelefono}
                                className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"
                            />
                        </View>
                        <TouchableOpacity
                            className='mt-6 border-filer-blue border-2 w-8/12 items-center p-2 rounded-full'
                            onPress={enviarFormulario}
                        >
                            <Text className='text-xl text-filer-blue'>
                                ENVIAR
                            </Text>
                        </TouchableOpacity>

                        {/* Mostrar mensaje después de intentar enviar el formulario */}
                        {message && <Text className="text-center mt-4">{message}</Text>}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
