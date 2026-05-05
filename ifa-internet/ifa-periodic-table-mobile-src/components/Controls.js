import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';

export default function Controls({ categories, activeCategory, onCategory, searchTerm, onSearch, view, onView }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>The Complete Form of Ifa's Periodic Table</Text>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Odu…"
          placeholderTextColor={COLORS.text3}
          value={searchTerm}
          onChangeText={onSearch}
        />
      </View>

      {/* Category chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow} contentContainerStyle={styles.chipsContent}>
        <TouchableOpacity
          style={[styles.chip, { borderColor: '#2e3a58' }, activeCategory === 'all' && styles.chipActive]}
          onPress={() => onCategory('all')}
        >
          <Text style={[styles.chipText, { color: '#9aa3ba' }]}>All</Text>
        </TouchableOpacity>

        {Object.entries(categories).map(([key, cat]) => (
          <TouchableOpacity
            key={key}
            style={[styles.chip, { borderColor: cat.color }, activeCategory === key && styles.chipActive]}
            onPress={() => onCategory(key)}
          >
            <Text style={[styles.chipText, { color: cat.color }]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* View toggle */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, view === 'table' && styles.toggleBtnActive]}
          onPress={() => onView('table')}
        >
          <Text style={[styles.toggleText, view === 'table' && styles.toggleTextActive]}>Grid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, view === 'list' && styles.toggleBtnActive]}
          onPress={() => onView('list')}
        >
          <Text style={[styles.toggleText, view === 'list' && styles.toggleTextActive]}>List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(15,19,32,0.97)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  heading: {
    fontSize: FONTS.xs,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.text2,
    textAlign: 'center',
    opacity: 0.8,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface1,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border1,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    fontSize: FONTS.md,
    color: COLORS.text3,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: FONTS.sm,
    color: COLORS.text,
  },
  chipsRow: {
    flexGrow: 0,
  },
  chipsContent: {
    gap: 6,
    paddingHorizontal: 2,
  },
  chip: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  chipText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  toggleRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.surface1,
    borderRadius: RADIUS.md,
    padding: 2,
    borderWidth: 1,
    borderColor: COLORS.border1,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontSize: FONTS.xs,
    fontWeight: '700',
    color: COLORS.text3,
    letterSpacing: 0.4,
  },
  toggleTextActive: {
    color: '#fff',
  },
});
