import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Modal, StyleSheet, StatusBar } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function PantallaFormularioCotizacion() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [errors, setErrors] = useState({}); // Errores para el formulario
    const [razonSocial, setRazonSocial] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [modalState, setModalState] = useState({
        visible: false,
        status: 'idle', // 'idle', 'loading', 'success', 'error'
        message: ''
    });

    const validateForm = () => {
        const newErrors = {};

        // Validación de Razón Social
        if (!razonSocial.trim()) {
            newErrors.razonSocial = 'La razón social es requerida.';
        }
        // Validación de Nombre
        if (!nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido.';
        }
        // Validación de Correo
        if (!correo.trim()) {
            newErrors.correo = 'El correo electrónico es requerido.';
        } else if (!/\S+@\S+\.\S+/.test(correo)) {
            // Esta es una expresión regular simple para validar el formato del email
            newErrors.correo = 'El formato del correo no es válido.';
        }
        // Validación de Teléfono
        if (!telefono.trim()) {
            newErrors.telefono = 'El número de teléfono es requerido.';
        }

        // Actualizamos el estado de errores
        setErrors(newErrors);

        // Devolvemos 'true' si no hay errores, 'false' si hay al menos uno
        return Object.keys(newErrors).length === 0;
    };

    const enviarFormulario = async () => {
        const isValid = validateForm();

        // Si el formulario no es válido, no hagas nada más.
        if (!isValid) {
            return;
        }
        
        // Inicia el proceso: muestra el modal en estado 'loading'
        setModalState({ visible: true, status: 'loading', message: '' });

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // ÉXITO: Cambia el contenido del modal a 'success'
                setModalState({
                    visible: true,
                    status: 'success',
                    message: '¡Cotización enviada con éxito!',
                });
                global.carrito = []; // Limpiamos el carrito global
            } else {
                // ERROR DEL SERVIDOR: Cambia el contenido del modal a 'error'
                setModalState({
                    visible: true,
                    status: 'error',
                    message: `Error: ${result.error || 'Ocurrió un problema'}`,
                });
            }
        } catch (error) {
            // ERROR DE RED: Cambia el contenido del modal a 'error'
            setModalState({
                visible: true,
                status: 'error',
                message: 'Error de conexión. Intenta nuevamente.',
            });
            console.error('Error al enviar el formulario:', error);
        }
    };

    // Función para cerrar el modal y navegar
    const handleCloseModal = () => {
        // Cierra el modal
        setModalState({ visible: false, status: 'idle', message: '' });
        // Si el envío fue exitoso, navega hacia atrás
        if (modalState.status === 'success') {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />   
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps="handled"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
            >
                <View className="bg-white text-xl h-screen" style={{ flex: 1 }}>
                    {/* Botón ver lista */}
                    <View style={{ paddingTop: insets.top }} className="bg-white h-15 justify-end items-center">
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
                                <View className="w-11/12">
                                    <TextInput
                                        placeholder='Razón social'
                                        placeholderTextColor="#9ca3af"
                                        value={razonSocial}
                                        onChangeText={(text) => {
                                            setRazonSocial(text);
                                            if (errors.razonSocial) setErrors(prev => ({ ...prev, razonSocial: null }));
                                        }}
                                        className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"
                                    />
                                    {/* Muestra el mensaje de error si existe */}
                                    {errors.razonSocial && <Text className="text-white text-sm mt-1 ml-4">{errors.razonSocial}</Text>}
                                </View>
                                <View className="w-11/12">
                                    <TextInput
                                        placeholder='Nombre'
                                        placeholderTextColor="#9ca3af"
                                        value={nombre}
                                        onChangeText={(text) => {
                                            setNombre(text);
                                            if (errors.nombre) setErrors(prev => ({ ...prev, nombre: null }));
                                        }}
                                        className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"
                                    />
                                    {errors.nombre && <Text className="text-white text-sm mt-1 ml-4">{errors.nombre}</Text>}
                                </View>
                                <View className="w-11/12">
                                    <TextInput
                                        placeholder='Correo electrónico'
                                        placeholderTextColor="#9ca3af"
                                        value={correo}
                                        onChangeText={(text) => {
                                            setCorreo(text);
                                            if (errors.correo) setErrors(prev => ({ ...prev, correo: null }));
                                        }}
                                        className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {errors.correo && <Text className="text-white text-sm mt-1 ml-4">{errors.correo}</Text>}
                                </View>
                                <View className="w-11/12">
                                    <TextInput
                                        placeholder='Número de teléfono'
                                        placeholderTextColor="#9ca3af"
                                        value={telefono}
                                        onChangeText={(text) => {
                                            setTelefono(text);
                                            if (errors.telefono) setErrors(prev => ({ ...prev, telefono: null }));
                                        }}
                                        className="h-2/12 w-11/12 bg-white rounded-full p-3 px-5 text-xl"
                                        keyboardType="phone-pad"
                                    />
                                    {errors.telefono && <Text className="text-white text-sm mt-1 ml-4">{errors.telefono}</Text>}
                                </View>
                            </View>

                            <TouchableOpacity
                                className='mt-6 border-filer-blue border-2 w-8/12 items-center p-2 rounded-full'
                                onPress={enviarFormulario}
                                disabled={modalState.status === 'loading'} // Deshabilita el botón mientras se envía
                            >
                                <Text className='text-xl text-filer-blue'>ENVIAR</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </KeyboardAwareScrollView>

            {/* Modal de carga (bloquea la pantalla mientras se envía el formulario) */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalState.visible}
                onRequestClose={handleCloseModal}
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
                        width: '80%',
                        minHeight: 180,
                        justifyContent: 'center',
                    }}>
                        {/* --- ESTADO DE CARGA --- */}
                        {modalState.status === 'loading' && (
                            <>
                                <ActivityIndicator size="large" color="#0077bf" />
                                <Text className="text-lg mt-4 text-gray-700">Enviando...</Text>
                            </>
                        )}

                        {/* --- ESTADO DE ÉXITO --- */}
                        {modalState.status === 'success' && (
                            <>
                                <Feather name="check-circle" size={50} color="#22c55e" />
                                <Text className="text-xl font-bold text-center mt-4">{modalState.message}</Text>
                                <TouchableOpacity
                                    className='mt-6 bg-filer-blue w-full items-center p-3 rounded-full'
                                    onPress={handleCloseModal}
                                >
                                    <Text className='text-lg text-white font-bold'>Aceptar</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* --- ESTADO DE ERROR --- */}
                        {modalState.status === 'error' && (
                            <>
                                <Feather name="x-circle" size={50} color="#ef4444" />
                                <Text className="text-lg text-center mt-4 text-gray-800">{modalState.message}</Text>
                                <TouchableOpacity
                                    className='mt-6 bg-gray-600 w-full items-center p-3 rounded-full'
                                    onPress={handleCloseModal}
                                >
                                    <Text className='text-lg text-white font-bold'>Cerrar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // O el color de fondo que desees
    },
});
