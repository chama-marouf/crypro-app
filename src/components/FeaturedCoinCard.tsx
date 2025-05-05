import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Sparkline from './SparkLine';
import SmoothSparkline from './SparkLine';
import {theme} from '../theme';
import {rgbaColor} from 'react-native-reanimated/lib/typescript/Colors';

const {width} = Dimensions.get('window');

const FeaturedCoinCard = ({coin}: {coin: any}) => {
  console.log('FeaturedCoinCard', coin);
  const getLastNPoints = (data, n = 30) => {
    return data?.slice(-n);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{uri: coin.image}} style={styles.icon} />
        <View>
          <Text style={styles.symbol}>{coin.symbol}</Text>
          <Text style={styles.name}>{coin.name}</Text>
        </View>
      </View>
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
      <View style={styles.bottomRow}>
        <Text style={styles.price}>${coin.currentPrice?.toLocaleString()}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2B2B2B4D',

    borderRadius: 24,
    padding: 20,
    marginRight: 22,
    width: width * 0.52,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 4},
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  symbol: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'LufgaBold',
  },
  name: {
    color: '#B0B0B0',
    fontSize: 15,
    fontFamily: 'LufgaRegular',
  },
  chart: {
    marginVertical: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'LufgaBold',
    marginRight: 10,
  },
  changePill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    minWidth: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  changeText: {
    color: '#181A20',
    fontSize: 15,
    fontFamily: 'LufgaBold',
  },
  positive: {
    color: '#D6FF3A',
  },
  negative: {
    color: '#FF4B4B',
  },
});

export default FeaturedCoinCard;
