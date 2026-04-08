import * as React from 'react';
import { Text,ScrollView, View, StyleSheet,TouchableOpacity, Button, Linking} from 'react-native';
import HorarioGrid from './components/grid'; 
import MapIcon from './components/mapa';
import ListaFotos from './components/ListaFotos';
import { WebView } from 'react-native-webview';


export default function locationDetailsScreen ({ route }) {
  const {location} = route.params;
  const abrirWhats = () => Linking.openURL(`tel:${location.fone}`);
  const abrirMapaExterno = async () => {
    const url = location.maps;

    if (!url) {
      Alert.alert("Erro", "Link do mapa não disponível para esta atração.");
      return;
    }

    const suportado = await Linking.canOpenURL(url);

    if (suportado) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não foi possível abrir o link: " + url);
    }
  };
  return (
  <ScrollView>
    <View style={styles.container}>
        <Text style={styles.locationName}>{location.nome}</Text>
        <Text style={styles.locationDetails}>bairro: {location.bairro}</Text>
        <Text style={styles.locationDetails}>descricao: {location.descricao}</Text>
        <TouchableOpacity style={styles.fone} onPress={abrirWhats}>
          <Text>Contato: {location.fone} </Text>
        </TouchableOpacity>
        <HorarioGrid funcionamento={location.funcionamento} />
        <ListaFotos imagens={location.imagens}/>
        <View style={styles.videoContainer}>
          <TouchableOpacity 
            style={styles.youtubeBtn} 
            onPress={() => Linking.openURL(location.video)}
          >
            <Text style={styles.playIcon}>▶</Text>
            <Text style={styles.youtubeBtnText}>Assistir vídeo da atração</Text>
            <Text style={styles.youtubeSubText}>(Abre no app do YouTube)</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={abrirMapaExterno}>
         <Text style={styles.buttonText}>Ver Localização no Mapa</Text>
        <MapIcon/>
        </TouchableOpacity>
    </View>
  </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 16,
  },
  fone: {
    margin: 8,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationDetails: {
    marginTop: 8,
    fontSize: 16,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    padding: 15,
    backgroundColor: '#3498db', 
  },
  buttonText:{
     color: '#FFFFFF',
     fontWeight: 'bold',
  },
  videoContainer: {
    marginVertical: 20,
    height: 150,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    elevation: 4,
  },
  youtubeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 40,
    color: '#FF0000', // Vermelho YouTube
  },
  youtubeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  youtubeSubText: {
    color: '#ccc',
    fontSize: 12,
  },
});