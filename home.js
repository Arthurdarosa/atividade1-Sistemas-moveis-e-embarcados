import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Home({ navigation }) {
    return(
      <View style={styles.container}>  
        <Text style={styles.title}>
        Bem vindo! 
        </Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('locationList')}>
          <Text style={styles.text}>conhecer atrações</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('FavLocation')}>
          <Text style={styles.text}>atrações favoritas</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Passes')}>
          <Text style={styles.text}>Passes</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
   padding: 15,
   alignItems: 'center',
  },
  title:{
    fontSize:18,
    padding:8,
  },
    button: {
      width: 200,
      marginTop: 8,  
      backgroundColor: '#3498db',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
})