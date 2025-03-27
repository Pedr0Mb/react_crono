import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    let interval;
    
    if (status) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [status]);

  const formatarTempo = (seconds) => {
    const minutos = Math.floor(seconds / 60).toString().padStart(2, '0');
    const segundos = (seconds % 60).toString().padStart(2, '0');
    return `${minutos}:${segundos}`;
  };

  const pararTempo= () => {
    setStatus(!status);
  };

  const resetarTempo= () => {
    setStatus(false);
    setTime(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatarTempo(time)}</Text>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={pararTempo}
        >
          <Text style={styles.buttonText}>{status ? 'Parar' : 'Começar'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]}
          onPress={resetarTempo}
        >
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  timeText: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    gap: 2,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: '#2196F3',
  },
  resetButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
