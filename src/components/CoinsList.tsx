import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import CoinCard from './CoinCard';

const CoinList = ({coins, onSelectCoin}) => {
  return (
    <FlatList
      data={coins}
      keyExtractor={item => item.id || item.symbol}
      renderItem={({item}) => (
        <CoinCard coin={item} onPress={() => onSelectCoin(item)} />
      )}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default CoinList;
