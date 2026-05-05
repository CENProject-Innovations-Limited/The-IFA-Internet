import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';

const DUALS = ['Asymmetry', 'Variance', 'Unity', 'Reduction', 'Decomposition', 'Atomism', 'Synthesis', 'Dynamism'];

export default function DualLaws({ categories }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>8 Dual Laws</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {Object.values(categories).map((cat, i) => (
          <View key={i} style={[styles.chip, { borderColor: cat.color }]}>
            <Text style={[styles.chipLaw, { color: cat.color }]}>{cat.label}</Text>
            <Text style={[styles.chipDual, { color: cat.color }]}>{DUALS[i]}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.surface2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 10,
  },
  label: {
    fontSize: FONTS.xs,
    fontWeight: '700',
    color: COLORS.text3,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    gap: 8,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    gap: 2,
  },
  chipLaw: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    opacity: 0.65,
  },
  chipDual: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
