import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SmoothSparkline from './SparkLine';
import {theme} from '../theme';
const {width} = Dimensions.get('window');

const CoinListCard = ({coin, onPress}) => {
  const getLastNPoints = (data, n = 30) => {
    return data?.slice(-n);
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}>
      <View style={styles.leftSection}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: coin.image}} style={[styles.icon]} />

          <Text style={styles.symbol}>{coin.symbol}</Text>
          <Text style={styles.name}>{coin.name}</Text>
        </View>
        <Text style={styles.price}>${coin.currentPrice?.toLocaleString()}</Text>
      </View>
      <View style={styles.rightSection}>
        <SmoothSparkline
          data={getLastNPoints(coin.sparkline, 30)}
          color={
            (coin.priceChangePercentage24h || coin.change) > 0
              ? theme.colors.accent
              : theme.colors.error
          }
          width={width * 0.52 - 40}
          height={30}
        />
        <View style={[styles.changePill]}>
          <Text
            style={[
              styles.changeText,
              coin.priceChangePercentage24h > 0
                ? styles.positive
                : styles.negative,
            ]}>
            {coin.priceChangePercentage24h > 0 ? '+' : ''}
            {coin.priceChangePercentage24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#181A20',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  leftSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  symbol: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'LufgaBold',
  },
  name: {
    color: '#B0B0B0',
    fontSize: 14,
    fontFamily: 'LufgaRegular',
  },
  rightSection: {
    alignItems: 'flex-end',
    flex: 1,
    marginLeft: 12,
  },

  price: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'LufgaBold',
    marginRight: 8,
  },
  changePill: {
    marginTop: 20,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  changeText: {
    color: '#181A20',
    fontSize: 13,
    fontFamily: 'LufgaBold',
  },
  positive: {
    color: '#D6FF3A',
  },
  negative: {
    color: '#FF4B4B',
  },
  chart: {
    marginTop: 2,
  },
});

export default CoinListCard;
