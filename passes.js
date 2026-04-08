import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OPCOES_PASSES = [
  { id: '1', nome: 'Básico', preco: 89, info: '3 atrações / 3 dias' },
  { id: '2', nome: 'Plus', preco: 149, info: '5 atrações / 5 dias' },
  { id: '3', nome: 'Top', preco: 199, info: '7 atrações / 7 dias' },
];

export default function PassesScreen() {
  const [meusPasses, setMeusPasses] = useState([]);

  useEffect(() => {
    carregarPasses();
  }, []);

  const carregarPasses = async () => {
    const salvos = await AsyncStorage.getItem('@passes_comprados');
    if (salvos) setMeusPasses(JSON.parse(salvos));
  };

  const comprarPasse = async (plano) => {
    const novoPasse = {
      // date.now pro id ja que nao tem como o mesmo usuario comprar duas vezes no mesmo milisegundo
      id: Date.now().toString(),
      nome: plano.nome,
      dataCompra: new Date().toLocaleDateString('pt-BR'),
      preco: plano.preco
    };
    const listaAtualizada = [...meusPasses, novoPasse];
    setMeusPasses(listaAtualizada);
    await AsyncStorage.setItem('@passes_comprados', JSON.stringify(listaAtualizada));
    Alert.alert("Sucesso", `Passe ${plano.nome} adquirido!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comprar Novo Passe</Text>
      {OPCOES_PASSES.map(plano => (
        <TouchableOpacity key={plano.id} style={styles.cardCompra} onPress={() => comprarPasse(plano)}>
          <Text style={styles.planoNome}>{plano.nome} - R${plano.preco}</Text>
          <Text>{plano.info}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.titulo, { marginTop: 20 }]}>Meus Passes Adquiridos</Text>
      <FlatList
        data={meusPasses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardPossuido}>
            <Text style={{fontWeight: 'bold'}}>Passe {item.nome}</Text>
            <Text>Comprado em: {item.dataCompra}</Text>
            <Text>
              Válido até: {(() => {
                const diasAdicionais = {
                  'Básico': 3,
                  'Plus': 5,
                  'Top': 7
                }[item.nome] || 0;

                // mes - 1 é pq o js ve o date como array, janeiro = 0 etc....
                const [dia, mes, ano] = item.dataCompra.split('/').map(Number);
                const dataVencimento = new Date(ano, mes - 1, dia);

                dataVencimento.setDate(dataVencimento.getDate() + diasAdicionais);

                return dataVencimento.toLocaleDateString('pt-BR');
              })()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  cardCompra: { padding: 15, backgroundColor: '#e3f2fd', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#2196f3' },
  planoNome: { fontSize: 16, fontWeight: 'bold' },
  cardPossuido: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' }
});