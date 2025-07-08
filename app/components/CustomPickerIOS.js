import React, { useRef, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import Feather from '@expo/vector-icons/Feather';

const CustomPickerIOS = forwardRef(({
  selectedValue,
  onValueChange,
  items = [],
  enabled = true,
  placeholder = "Seleccione...",
  onOpen,
}, ref) => {

  // --- Lógica y Refs para el BottomSheet ---
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '60%'], []); // Altura del BottomSheet

  const handlePresentModalPress = useCallback(() => {
    if(onOpen) onOpen();
    bottomSheetModalRef.current?.present();
  }, [onOpen]);

  useImperativeHandle(ref, () => ({
    dismiss() {
      bottomSheetModalRef.current?.dismiss();
    },
    present() {
        bottomSheetModalRef.current?.present();
    }
  }));

  const handleSelectItem = useCallback((itemValue) => {
    onValueChange(itemValue);
    bottomSheetModalRef.current?.dismiss();
  }, [onValueChange]);

  // --- Renderizado de cada item en la lista del BottomSheet ---
  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleSelectItem(item.value)}
    >
      <Text style={styles.itemText}>{item.label}</Text>
      {selectedValue === item.value && (
        <Feather name="check-circle" size={24} color="#0077bf" />
      )}
    </TouchableOpacity>
  ), [handleSelectItem, selectedValue]);


  // --- Renderizado para Android y Web (sin cambios) ---
  if (Platform.OS !== 'ios') {
    return (
      <View style={styles.pickerWrapperAndroid}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          enabled={enabled}
          style={styles.pickerAndroid}
        >
          <Picker.Item label={placeholder} value="" enabled={false} /> 
          {items.map(item => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    );
  }


  // --- Renderizado para iOS (con BottomSheet) ---
  const displayText = selectedValue
    ? items.find(item => item.value === selectedValue)?.label || placeholder
    : placeholder;
    
  return (
    <>
      <TouchableOpacity
        style={[styles.button, !enabled && styles.disabledButton]}
        onPress={handlePresentModalPress}
        disabled={!enabled}
      >
        <Text style={[styles.buttonText, !enabled && styles.disabledText]}>
          {displayText}
        </Text>
        <Feather name="chevron-down" size={20} color={enabled ? '#6b7280' : '#d1d5db'} />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{placeholder}</Text>
        </View>
        <BottomSheetFlatList
          data={items}
          keyExtractor={(i) => i.value}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetModal>
    </>
  );
});

export default CustomPickerIOS;

// --- Estilos para el nuevo componente ---
const styles = StyleSheet.create({
  // Estilos para el botón de iOS
  button: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'transparent', // Fondo blanco por defecto
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  disabledButton: {
    borderColor: '#d1d5db', // Un borde gris claro en lugar de negro
    backgroundColor: '#f9fafb', // Un fondo casi blanco, pero ligeramente gris
  },
  disabledText: {
    color: '#9ca3af',
  },
  // Estilos para el BottomSheet de iOS
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  itemText: {
    fontSize: 18,
  },
  bottomSheetBackground: {
    backgroundColor: '#f9fafb',
  },
  // Estilos para el Picker de Android/Web
  pickerWrapperAndroid: {
    width: '100%',
    height: 56, // Equivalente a h-14 (14 * 4 = 56)
    justifyContent: 'center', // Mantenemos el justify-center para el contenedor
  },
  pickerAndroid: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});