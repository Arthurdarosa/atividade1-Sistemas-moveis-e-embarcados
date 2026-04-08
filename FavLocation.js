import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dadosLocais from './atracoes.json'; 
import HeartIcon from './components/coracao';

export default function FavoritesScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [favoritesData, setFavoritesData] = useState([]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const savedFavs = await AsyncStorage.getItem('@favoritos');
      if (savedFavs) {
        const ids = JSON.parse(savedFavs);
        //Só deixa passar o que estiver no array de IDs salvos
        const filtered = dadosLocais.filter(item => ids.includes(item.id));
        setFavoritesData(filtered);
      } else {
        setFavoritesData([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : favoritesData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você ainda não tem atrações favoritas.</Text>
        </View>
      ) : (
        <FlatList
          data={favoritesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('locationDetails', { location: item })}
            >
              <View style={styles.linha}>
                <Text style={styles.locationName}>{item.nome}</Text>
                <HeartIcon filled={true} size={30} /> 
              </View>
              <Text style={styles.locationBairro}>{item.bairro}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  card: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  locationName: { fontSize: 18, fontWeight: 'bold' },
  locationBairro: { fontSize: 14, color: '#666' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' }
});