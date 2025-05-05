import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../theme';
import {Search} from 'react-native-feather';

const SearchBar = ({searchTerm, onSearch, placeholder}: any) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.sectionTitle}>All Coins</Text>
        <View style={styles.underline} />
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={onSearch}
          placeholder={placeholder}
          placeholderTextColor={'#888'}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Search color={theme.colors.white} width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  labelContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: '40%',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'LufgaBold',
    color: theme.colors.white,
    marginBottom: 0,
  },
  underline: {
    marginTop: 4,
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderRadius: 28,
    paddingHorizontal: 20,
    height: 56,
    flex: 1,
    minWidth: 180,
    maxWidth: 320,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: 'LufgaRegular',
  },
  searchIcon: {
    paddingLeft: 8,
  },
});

export default SearchBar;
