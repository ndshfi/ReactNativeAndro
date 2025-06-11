import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const contacts = [
  { name: 'Muhammad Hanif', phone: '085156350374' },
  { name: 'Ahmad Rizky', phone: '085712345678' },
  { name: 'Dewi Sartika', phone: '089912345678' },
  { name: 'Siti Aminah', phone: '081234567890' },
  { name: 'Andi Saputra', phone: '085123456789' },
  { name: 'Budi Raharjo', phone: '082123456789' },
  { name: 'Citra Lestari', phone: '083123456789' },
  { name: 'Dian Permata', phone: '084123456789' },
  { name: 'Eko Prasetyo', phone: '081912345678' },
  { name: 'Fitri Ayu', phone: '087123456789' },
];

export default function ContactHome({ navigation }) {
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ContactDetail', { contact: item })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={(_, i) => i.toString()}
    />
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  avatar: { backgroundColor: '#007AFF', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  info: { marginLeft: 15, justifyContent: 'center' },
  phone: { fontSize: 14, color: '#666' },
  name: { fontSize: 16, fontWeight: 'bold' },
});
