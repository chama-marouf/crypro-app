import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {theme} from '../theme';
import CandlestickChart from '../components/CandlestickChart';

const TIMEFRAMES = [
  {label: '1H', days: '1'},
  {label: '1D', days: '1'},
  {label: '1W', days: '7'},
  {label: '1M', days: '30'},
  {label: '3M', days: '90'},
  {label: '1Y', days: '365'},
];

const CoinDetailsScreen = ({route}: any) => {
  const {coin} = route.params;
  const [ohlc, setOhlc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState('1');

  useEffect(() => {
    try {
      const prices = coin.sparkline; // Assuming it's an array like [101, 102, 99, 104, ...]
      if (!Array.isArray(prices) || prices.length < 2) {
        throw new Error('Invalid sparkline data');
      }

      const interval = 60 * 60 * 1000; // 1 hour in ms
      const startTimestamp = Date.now() - prices.length * interval;

      const candles = prices
        .slice(0, prices.length - 1)
        .map((price: number, i: number) => {
          const open = prices[i];
          const close = prices[i + 1];
          const high = Math.max(open, close);
          const low = Math.min(open, close);
          const timestamp = startTimestamp + i * interval;

          return {
            timestamp,
            open,
            high,
            low,
            close,
          };
        });

      setOhlc(candles);
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Failed to process chart data');
      setOhlc([]);
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>{coin.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${coin.price?.toFixed(2)}</Text>
          <View
            style={[
              styles.bubble,
              {
                backgroundColor:
                  parseFloat(coin.change) >= 0
                    ? theme.colors.accent
                    : theme.colors.error,
              },
            ]}>
            <Text style={styles.bubbleText}>{coin.change}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.timeframeScroll}>
        {TIMEFRAMES.map(tf => (
          <TouchableOpacity
            key={tf.label}
            style={[
              styles.timeframeBtn,
              timeframe === tf.days && styles.timeframeBtnActive,
            ]}
            onPress={() => {
              setTimeframe(tf.days);
              setLoading(true);
            }}>
            <Text
              style={[
                styles.timeframeBtnText,
                timeframe === tf.days && styles.timeframeBtnTextActive,
              ]}>
              {tf.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.chartWrapper}>
        {loading ? (
          <ActivityIndicator
            color={theme.colors.accent}
            style={{marginTop: 32}}
          />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <CandlestickChart
            data={ohlc}
            width={Dimensions.get('window').width - 32}
            height={280}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'LufgaBold',
    color: '#FFFFFF',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 36,
    fontFamily: 'LufgaBold',
    color: '#FFFFFF',
    marginRight: 10,
  },
  bubble: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bubbleText: {
    fontSize: 14,
    fontFamily: 'LufgaBold',
    color: '#000',
  },
  chartWrapper: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 8,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 32,
  },
  timeframeScroll: {
    paddingLeft: 16,
    marginVertical: 16,
  },
  timeframeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    marginRight: 8,
  },
  timeframeBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  timeframeBtnText: {
    fontSize: 14,
    fontFamily: 'LufgaMedium',
    color: '#888',
  },
  timeframeBtnTextActive: {
    color: '#000000',
    fontFamily: 'LufgaBold',
  },
});

export default CoinDetailsScreen;
