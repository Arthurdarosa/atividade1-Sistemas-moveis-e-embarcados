import React from 'react';
import { ScrollView, Image, StyleSheet, View, Dimensions } from 'react-native';
import imageMap from '../ImageMap';

const { width } = Dimensions.get('window');

export default function ListaFotos({ imagens }) {
  if (!imagens || !Array.isArray(imagens)) return null;

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        {imagens.map((imgKey, index) => (
          <View key={index} style={styles.card}>
            <Image 
              source={imageMap[imgKey]} 
              style={styles.image} 
              resizeMode="cover" 
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  scrollPadding: {
    paddingLeft: 20, 
    paddingRight: 10,
  },
  card: {
    width: width * 0.7, 
    height: 200,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden', // Garante que a imagem siga o arredondamento
  },
  image: {
    width: '100%',
    height: '100%',
  },
});