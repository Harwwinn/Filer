import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="pantallaProducto" options={{headerShown:false}}/>
      <Stack.Screen name="pantallaCotizacion" options={{headerShown:false}}/>
      <Stack.Screen name="pantallaFormularioCotizacion" options={{headerShown:false}}/>
    </Stack>
  )
  
}
