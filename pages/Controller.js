import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Controller() {
  const handlePress = (label) => {
    console.log(label);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controller</Text>

      {/* Tombol arah */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={() => handlePress('atas')} style={styles.arrowButton}>
          <Text style={styles.arrowText}>⬆️</Text>
        </TouchableOpacity>
        <View style={styles.horizontalArrows}>
          <TouchableOpacity onPress={() => handlePress('kiri')} style={styles.arrowButton}>
            <Text style={styles.arrowText}>⬅️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('kanan')} style={styles.arrowButton}>
            <Text style={styles.arrowText}>➡️</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handlePress('bawah')} style={styles.arrowButton}>
          <Text style={styles.arrowText}>⬇️</Text>
        </TouchableOpacity>
      </View>

      {/* Tombol spasi */}
      <TouchableOpacity onPress={() => handlePress('lompat')} style={styles.spaceButton}>
        <Text style={styles.spaceText}>Spasi (Jump)</Text>
      </TouchableOpacity>

      {/* Tombol aksi */}
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => handlePress('aksi kiri')} style={styles.actionButton}>
          <Text style={styles.actionText}>Aksi Kiri</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('aksi kanan')} style={styles.actionButton}>
          <Text style={styles.actionText}>Aksi Kanan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 30, fontWeight: 'bold' },

  arrowContainer: { alignItems: 'center', marginBottom: 20 },
  horizontalArrows: { flexDirection: 'row', gap: 20, marginVertical: 10 },
  arrowButton: { backgroundColor: '#ddd', padding: 20, borderRadius: 10 },
  arrowText: { fontSize: 24 },

  spaceButton: { backgroundColor: '#007AFF', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10, marginBottom: 20 },
  spaceText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  actionContainer: { flexDirection: 'row', gap: 20 },
  actionButton: { backgroundColor: '#FF9500', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 10 },
  actionText: { color: '#fff', fontWeight: 'bold' },
});
