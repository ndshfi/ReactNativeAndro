import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactDetail({ route }) {
  const { contact } = route.params;
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.bigAvatar}>
        <Text style={styles.bigAvatarText}>{getInitials(contact.name)}</Text>
      </View>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 50 },
  bigAvatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' },
  bigAvatarText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 20 },
  phone: { fontSize: 18, marginTop: 10, color: '#333' },
});
