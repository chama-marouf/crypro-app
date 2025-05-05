import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FeaturedCoinCard from './FeaturedCoinCard';

const {width} = Dimensions.get('window');

const FeaturedCoins = ({featuredCoins, onPressCoin}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.featuredScroll}
      contentContainerStyle={styles.featuredScrollContent}>
      {featuredCoins.map((coin, idx) => (
        <TouchableOpacity
          key={coin.id || coin.symbol || idx}
          onPress={() => onPressCoin(coin)}
          activeOpacity={0.85}>
          <FeaturedCoinCard coin={coin} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  featuredScroll: {
    marginLeft: 16,
    marginBottom: 16,
    minHeight: 200,
    maxHeight: 220,
  },
  featuredScrollContent: {
    alignItems: 'center',
    paddingRight: 16,
  },
});

export default FeaturedCoins;
