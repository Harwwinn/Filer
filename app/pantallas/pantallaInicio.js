import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import images from '../../assets/images/images'; // Asegúrate que la ruta sea correcta

// --- NUEVAS IMPORTACIONES ---
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PantallaInicio({ setPantalla }) {
  // --- OBTENER LOS INSETS ---
  // Este hook nos da las medidas de las áreas seguras (top, bottom, left, right)
  const insets = useSafeAreaInsets();

  return (
    // View principal que ocupa toda la pantalla
    <View style={styles.fullScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Capa 1: Imagen de fondo (ocupa toda la pantalla) */}
      <Image 
        source={images['fondoPrincipal']} 
        style={styles.backgroundImage} 
        resizeMode='cover'
      />

      {/* Capa 2: Superposición blanca (ocupa toda la pantalla) */}
      <View style={styles.overlay} />

      {/* Capa 3: Contenido. A este le aplicamos los insets como padding. */}
      {/* Esto asegura que el contenido no se solape, pero el fondo sí. */}
      <View 
        style={[
          styles.contentContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom }
        ]}
      >
        {/* Envolvemos el contenido en un TouchableOpacity para la acción de "entrar" */}
        <TouchableOpacity 
          style={styles.touchableContent}
          activeOpacity={1} 
          onPress={() => setPantalla("home")}
        >
          {/* Sección Superior */}
          <View className='items-center w-full'>
            <Image 
              source={images['filerLogo']} 
              className='h-24 w-56'
              resizeMode='contain' 
            />
            <Text className='text-2xl text-filer-blue font-extrabold tracking-tight mt-2 text-center'>
              TRANSFORMANDO EL AIRE QUE RESPIRAS
            </Text>
          </View>

          {/* Sección Media */}
          <View className='w-full px-4'>
            <Text className='text-lg font-normal text-gray-800 leading-relaxed text-center'>
              Somos distribuidores autorizados de filtros de aire <Text className="font-bold">AAF® International</Text> en México. Contamos con ingenieros especializados para ayudarle a encontrar la solución adecuada a sus requerimientos de filtración.
            </Text>
          </View>

          {/* Sección Inferior */}
          <View className='items-center w-full'>
            <Text className='text-base text-black font-semibold mb-2'>
              American Air Filter International
            </Text>
            <Image 
              source={images['aafLogo']} 
              className='h-16 w-40' 
              resizeMode='contain' 
            />
            <Text className='text-base text-red-700 font-black tracking-wide mt-2'>
              BRINGING CLEAN AIR TO LIFE.®
            </Text>
          </View>

          {/* Footer */}
          <View className='items-center w-full'>
            <Text className='text-lg font-semibold'>
              Toca para entrar
            </Text>
            <Text className='text-xs font-normal text-gray-600 mt-4'>
              © 2025 AAF Company, Inc. & Filer Hvac&r Solutions
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
	position: 'relative',
  },
  backgroundImage: {
	...StyleSheet.absoluteFillObject,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', 
  },
  contentContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    paddingHorizontal: 20,
    // El padding vertical se aplica dinámicamente con los insets
  },
  touchableContent: {
    flex: 1, // El área táctil ocupa todo el espacio del contenedor de contenido
    justifyContent: 'space-around', 
    alignItems: 'center',
  },
});