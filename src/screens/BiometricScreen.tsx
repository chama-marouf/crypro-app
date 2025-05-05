import React, {useEffect} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricScreen = ({navigation}) => {
  const authenticate = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .simplePrompt({promptMessage: 'Authenticate to Proceed'})
      .then(result => {
        const {success} = result;

        if (success) {
          console.log('Authenticated successfully');
          navigation.replace('MarketOverview');
        } else {
          Alert.alert('Authentication failed', 'Please try again.');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert(
          'Biometric Authentication Error',
          'Please enable biometrics in your device settings.',
        );
      });
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Authenticating...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BiometricScreen;
