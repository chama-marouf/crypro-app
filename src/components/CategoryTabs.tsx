import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {theme} from '../theme';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Featured':
        return '⭐';
      case 'Top Gainers':
        return '🚀';
      case 'Top Losers':
        return '🚩';
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabsContainer}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={styles.tabBtn}
          onPress={() => onSelectCategory(category)}>
          <Text
            style={[
              styles.tabText,
              selectedCategory === category && styles.activeTabText,
            ]}>
            <Text style={styles.icon}>{getCategoryIcon(category)} </Text>
            {category}
          </Text>
          {selectedCategory === category && (
            <View style={styles.tabUnderline} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBtn: {
    marginRight: 24,
    alignItems: 'center',
  },
  tabText: {
    color: theme.colors.secondary,
    fontSize: 20,
    fontFamily: 'LufgaBold',
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: theme.colors.white,
  },
  icon: {
    fontSize: 18,
  },
  tabUnderline: {
    height: 2,
    backgroundColor: theme.colors.accent,
    width: '100%',
    marginTop: 4,
    borderRadius: 1,
  },
});

export default CategoryTabs;
