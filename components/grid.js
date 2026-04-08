import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HorarioGrid({ funcionamento }) {
  if (!funcionamento) return null;

  const diasDaSemana = Object.entries(funcionamento);

  return (
    <View style={styles.gridContainer}>
      {diasDaSemana.map(([dia, horario]) => {
        // ignorar letras maisculas ou erros na hora de escrever o json dos dados
        const estaFechado = horario.toLowerCase() === 'fechado' || horario.toLowerCase() === 'fechado!';

        return (
          <View 
            key={dia} 
            style={[
              styles.gridItem, 
              { 
                backgroundColor: estaFechado ? '#FFEBEE' : '#E8F5E9',
                borderColor: estaFechado ? '#FFCDD2' : '#C8E6C9'     
              }
            ]}
          >
            <Text style={[styles.diaTexto, { color: estaFechado ? '#C62828' : '#2E7D32' }]}>
              {dia.toUpperCase()}
            </Text>
            <Text style={[styles.horaTexto, { color: estaFechado ? '#D32F2F' : '#4CAF50' }]}>
              {horario}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  gridItem: {
    width: '48%', 
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  diaTexto: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  horaTexto: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600'
  },
});