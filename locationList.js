import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dadosLocais from './atracoes.json'; 
import HeartIcon from './components/coracao';

export default function LocationListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); 
  const [favoritos, setFavoritos] = useState([]); 

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const favsSalvos = await AsyncStorage.getItem('@favoritos');
        if (favsSalvos) setFavoritos(JSON.parse(favsSalvos));

        // Ordena os dados
        const dadosOrdenados = [...dadosLocais].sort((a, b) => a.nome.localeCompare(b.nome));
        setData(dadosOrdenados);
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const alternarFavorito = async (id) => {
    try {
      let novaLista = [...favoritos];
      
      if (novaLista.includes(id)) {
        // Se já é favorito remove
        novaLista = novaLista.filter(favId => favId !== id);
      } else {
        novaLista.push(id);
      }

      setFavoritos(novaLista); 
      await AsyncStorage.setItem('@favoritos', JSON.stringify(novaLista)); 
    } catch (e) {
      console.error("Erro ao salvar favorito", e);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Carregando atrações...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              // Verifica se este item específico está na lista de favoritos
              const isFavorito = favoritos.includes(item.id);

              return (
                <TouchableOpacity 
                  style={styles.card}
                  onPress={() => navigation.navigate('locationDetails', { location: item })}
                >
                  <View style={styles.linha}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.locationName}>{item.nome}</Text>
                      <Text style={styles.locationBairro}>{item.bairro}</Text>
                    </View>

                    {/* Botão do Coração separado para não disparar o 'onPress' do card inteiro */}
                    <Pressable 
                      onPress={() => alternarFavorito(item.id)}
                      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                    >
                      <HeartIcon filled={isFavorito} size={30} /> 
                    </Pressable>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  card: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationBairro: {
    fontSize: 14,
    color: '#666',
  }
});