import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CELL, COLORS, FONTS, RADIUS } from '../theme';
import { primaryGlyph } from '../helpers';

export default function OduCell({ row, col, cellNum, color, isMeji, isDimmed, cellSize, onPress }) {
  const priGlyph = primaryGlyph(row.code);
  const secGlyph = primaryGlyph(col.code);
  const short    = isMeji ? row.name : `${row.name.slice(0,3)}-${col.name.slice(0,3)}`;
  const sz       = cellSize || CELL;

  return (
    <TouchableOpacity
      onPress={isDimmed ? null : onPress}
      activeOpacity={isDimmed ? 1 : 0.7}
      style={[
        styles.cell,
        { borderColor: color, width: sz, height: sz },
        isDimmed && styles.cellDim,
        isMeji && styles.cellMeji,
      ]}
    >
      <Text style={[styles.num, { color }]}>{cellNum}</Text>
      <View style={styles.glyphWrap}>
        <Text style={[styles.glyphSec, { color, fontSize: sz * 0.18, lineHeight: sz * 0.2 }]} numberOfLines={1}>{secGlyph}</Text>
        <Text style={[styles.glyphPri, { color, fontSize: sz * 0.28, lineHeight: sz * 0.3 }]} numberOfLines={1}>{priGlyph}</Text>
      </View>
      <Text style={[styles.name, { color }]} numberOfLines={1}>{short}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.03)',
    overflow: 'hidden',
  },
  cellMeji: {
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  cellDim: {
    opacity: 0.12,
  },
  num: {
    fontSize: 5,
    fontWeight: '700',
    alignSelf: 'flex-start',
    lineHeight: 7,
    paddingLeft: 1,
  },
  glyphWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  glyphSec: {
    fontSize: CELL * 0.18,
    fontWeight: '700',
    lineHeight: CELL * 0.2,
    letterSpacing: -1,
  },
  glyphPri: {
    fontSize: CELL * 0.28,
    fontWeight: '800',
    lineHeight: CELL * 0.3,
    letterSpacing: -1,
  },
  name: {
    fontSize: 5,
    fontWeight: '600',
    letterSpacing: 0.1,
    textAlign: 'center',
    lineHeight: 7,
  },
});
