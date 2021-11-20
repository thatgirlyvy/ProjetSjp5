import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerTitle}>
           <Image source={require('../assets/logo.png')} style={styles.headerImage} />
      <Text style={styles.headerText}> PROJET SJP5 </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    headerImage: {
        width: 26,
        height: 26,
        marginHorizontal: 50
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
        textAlign: 'center'
      },
      headerTitle: {
        flexDirection: 'row',
        textAlign: 'center'
      },
});