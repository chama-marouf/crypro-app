import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {theme} from '../theme';
import BiometricsImg from '../assets/biometrics-img.svg';

const {width} = Dimensions.get('window');

const BiometricScreen = ({navigation}: {navigation: any}) => {
  const [biometricAvailable, setBiometricAvailable] = useState<boolean | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      const rnBiometrics = new ReactNativeBiometrics();
      const {available} = await rnBiometrics.isSensorAvailable();
      setBiometricAvailable(available);
    };
    checkBiometrics();
  }, []);

  const authenticate = async () => {
    if (!biometricAvailable) {
      Alert.alert(
        'Biometrics Not Set Up',
        'Please enable biometrics in your device settings to continue.',
      );
      return;
    }
    setLoading(true);
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics
      .simplePrompt({promptMessage: 'Authenticate to Proceed'})
      .then(result => {
        setLoading(false);
        const {success} = result;
        if (success) {
          navigation.replace('MarketOverview');
        } else {
          Alert.alert('Authentication failed', 'Please try again.');
        }
      })
      .catch(_error => {
        setLoading(false);
        Alert.alert(
          'Biometric Authentication Error',
          'Please enable biometrics in your device settings.',
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Use Biometric to log in?</Text>
      <BiometricsImg
        width={width * 0.8}
        height={width * 0.8}
        style={styles.fingerprint}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={authenticate}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <Text style={styles.buttonText}>Set Up</Text>
        )}
      </TouchableOpacity>
      {biometricAvailable === false && (
        <Text style={styles.errorText}>
          Biometric authentication is not set up on this device.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'LufgaBold',
    fontSize: 32,
    color: theme.colors.white,
    marginBottom: 48,
    textAlign: 'center',
  },
  fingerprint: {
    marginBottom: 48,
  },
  button: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: theme.colors.accent,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontFamily: 'LufgaBold',
  },
  errorText: {
    color: theme.colors.error,
    fontFamily: 'LufgaRegular',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default BiometricScreen;
