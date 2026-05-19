import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';

export default function ListView({ odu, categories, activeCategory, searchTerm, onSelect }) {
  const filtered = odu.filter(o => {
    const catOk    = activeCategory === 'all' || o.category === activeCategory;
    const searchOk = !searchTerm ||
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.meji.toLowerCase().includes(searchTerm.toLowerCase());
    return catOk && searchOk;
  });

  if (!filtered.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No Odu match your search.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={o => String(o.id)}
      numColumns={2}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={styles.row}
      renderItem={({ item: o }) => {
        const cat = categories[o.category];
        return (
          <TouchableOpacity
            style={[styles.card, { borderColor: cat.color + '44' }]}
            onPress={() => onSelect({ row: o, col: o, num: o.id })}
            activeOpacity={0.75}
          >
            <View style={[styles.badge, { borderColor: cat.color }]}>
              <Text style={[styles.badgeNum, { color: cat.color }]}>{o.id}</Text>
            </View>
            <Text style={styles.name}>{o.meji}</Text>
            <Text style={styles.yoruba}>{o.yoruba} Méjì</Text>
            <Text style={[styles.cat, { color: cat.color }]}>{cat.label}</Text>
            <Text style={styles.desc} numberOfLines={3}>{o.meaning}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: 12,
    gap: 10,
  },
  row: {
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface1,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 14,
    gap: 5,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  badgeNum: {
    fontSize: FONTS.sm,
    fontWeight: '800',
  },
  name: {
    fontSize: FONTS.base,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  yoruba: {
    fontSize: FONTS.xs,
    color: COLORS.text3,
    letterSpacing: 0.3,
  },
  cat: {
    fontSize: FONTS.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  desc: {
    fontSize: FONTS.xs,
    color: COLORS.text2,
    lineHeight: 16,
    marginTop: 4,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    color: COLORS.text3,
    fontSize: FONTS.base,
  },
});
