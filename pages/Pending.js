import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const animalData = [
  { name: 'Cat', image: require('../assets/image.png') },
  { name: 'Dog', image: require('../assets/image.png') },
  { name: 'Lion', image: require('../assets/image.png') },
  { name: 'Tiger', image: require('../assets/image.png') },
  { name: 'Elephant', image: require('../assets/image.png') },
  { name: 'Monkey', image: require('../assets/image.png') },
  { name: 'Bear', image: require('../assets/image.png') },
  { name: 'Panda', image: require('../assets/image.png') },
  { name: 'Zebra', image: require('../assets/image.png') },
  { name: 'Horse', image: require('../assets/image.png') },
  { name: 'Kangaroo', image: require('../assets/image.png') },
  { name: 'Giraffe', image: require('../assets/image.png') },
  { name: 'Fox', image: require('../assets/image.png') },
  { name: 'Wolf', image: require('../assets/image.png') },
  { name: 'Rabbit', image: require('../assets/image.png') },
  { name: 'Cow', image: require('../assets/image.png') },
];

export default function Summary() {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={animalData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    maxWidth: Dimensions.get('window').width / 4 - 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});
