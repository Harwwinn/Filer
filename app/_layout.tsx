import 'react-native-gesture-handler'; 

import { Stack } from "expo-router";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="pantallaProducto" options={{headerShown:false}}/>
            <Stack.Screen name="pantallaCotizacion" options={{headerShown:false}}/>
            <Stack.Screen name="pantallaFormularioCotizacion" options={{headerShown:false}}/>
          </Stack>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
  
}
