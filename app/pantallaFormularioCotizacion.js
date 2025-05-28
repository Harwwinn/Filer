import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Modal } from 'react-native';
import { useState } from 'react';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function PantallaFormularioCotizacion() {
    const [razonSocial, setRazonSocial] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Nuevo estado para bloquear la pantalla

    const enviarFormulario = async () => {
        setLoading(true);  // Activar bloqueo de pantalla

        const data = {
            productos: global.carrito,
            email: correo,
            name: nombre,
            phone: telefono,
            company: razonSocial
        };

        try {
            const response = await fetch('https://servidorfiler.vercel.app/send-quote', {
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
        } finally {
            setLoading(false); // Desactivar bloqueo de pantalla
        }
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}
            >
                <View className="bg-white text-xl h-screen">
                    {/* Botón ver lista */}
                    <View className="bg-white h-15 justify-end items-center">
                        <TouchableOpacity className='w-full flex flex-row justify-end items-center mr-10 mb-2'>
                            <Text className='text-right text-xl mr-1 text-filer-blue'>Ver Lista</Text>
                            <Feather name="wind" size={24} color="#0077bf" />
                        </TouchableOpacity>
                    </View>

                    <KeyboardAwareScrollView 
                        extraScrollHeight={100}
                        enableOnAndroid={true}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <View className="p-5 items-center">
                            <Text className="w-full text-left text-5xl font leading-snug">
                                Información de contacto
                            </Text>
                        </View>

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
                                disabled={loading} // Deshabilita el botón mientras se envía
                            >
                                <Text className='text-xl text-filer-blue'>ENVIAR</Text>
                            </TouchableOpacity>

                            {/* Mostrar mensaje después de intentar enviar el formulario */}
                            {message && <Text className="text-center mt-4">{message}</Text>}
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </KeyboardAvoidingView>

            {/* Modal de carga (bloquea la pantalla mientras se envía el formulario) */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={loading}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                        width: 200
                    }}>
                        <ActivityIndicator size="large" color="#0077bf" />
                        <Text className="text-lg mt-2">Enviando...</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
