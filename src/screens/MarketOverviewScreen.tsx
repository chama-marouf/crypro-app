import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import CategoryTabs from '../components/CategoryTabs';
import FeaturedCoins from '../components/FeaturedCoins';
import CoinList from '../components/CoinsList';
import SearchBar from '../components/SearchBar';
import {fetchCoins} from '../services/api';
import {theme} from '../theme';

const PAGE_SIZE = 20;

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  currentPrice: number;
  marketCap: number;
  priceChangePercentage24h: number;
  sparkline?: number[];
}

const MarketOverviewScreen = ({navigation}: {navigation: any}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [coins, setCoins] = useState<Coin[]>([]);
  const [featuredCoins, setFeaturedCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['Featured', 'Top Gainers', 'Top Losers'];

  const loadCoins = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        setError(null);
        const newPage = reset ? 1 : page;
        const data = await fetchCoins(newPage, PAGE_SIZE);

        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        // Update featured coins (top 3 by market cap)
        if (reset || newPage === 1) {
          setFeaturedCoins(data.slice(0, 3));
        }

        // Update coins list
        if (reset) {
          setCoins(data);
        } else {
          setCoins(prev => [...prev, ...data]);
        }

        setHasMore(data.length === PAGE_SIZE);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load coins';
        setError(errorMessage);
        console.error('Error loading coins:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page],
  );

  const applyFilters = useCallback(() => {
    let filtered = [...coins];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        coin =>
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower),
      );
    }

    // Apply category filter
    switch (selectedCategory) {
      case 'Top Gainers':
        filtered = filtered
          .filter(coin => coin.priceChangePercentage24h > 0)
          .sort(
            (a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h,
          );
        break;
      case 'Top Losers':
        filtered = filtered
          .filter(coin => coin.priceChangePercentage24h < 0)
          .sort(
            (a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h,
          );
        break;
      case 'Stablecoins':
        filtered = filtered.filter(
          coin =>
            coin.symbol.toLowerCase().includes('usdt') ||
            coin.symbol.toLowerCase().includes('usdc'),
        );
        break;
      default:
        // Sort by market cap for 'Featured' category
        filtered.sort((a, b) => b.marketCap - a.marketCap);
    }

    setFilteredCoins(filtered);
  }, [coins, searchTerm, selectedCategory]);

  useEffect(() => {
    loadCoins(true);
  }, [loadCoins]);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      loadCoins();
    }
  }, [page, loadCoins]);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, searchTerm, coins, applyFilters]);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    loadCoins(true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCoinSelect = (coin: Coin) => {
    navigation.navigate('CoinDetails', {coin});
  };

  if (loading && !refreshing && page === 1) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.accent}
          />
        }
        onScrollEndDrag={handleLoadMore}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <FeaturedCoins
              featuredCoins={featuredCoins}
              onPressCoin={handleCoinSelect}
            />
            <SearchBar
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
              placeholder="Search for a coin..."
            />
            <CoinList coins={filteredCoins} onSelectCoin={handleCoinSelect} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  content: {
    paddingBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'LufgaRegular',
  },
});

export default MarketOverviewScreen;
