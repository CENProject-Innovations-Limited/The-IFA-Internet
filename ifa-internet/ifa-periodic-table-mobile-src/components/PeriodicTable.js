import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import OduCell from './OduCell';
import { COLORS, FONTS, RADIUS } from '../theme';
import { cellNum, oduName, secondaryAt, calcDimmed } from '../helpers';

const SCREEN_W   = Dimensions.get('window').width;
const ROW_HEADER_W = 58;
const GAP          = 2;
const NUM_COLS     = 16;
const H_PAD        = 12; // 6px each side from App.js tableWrap
const CELL_SIZE    = Math.floor((SCREEN_W - H_PAD - ROW_HEADER_W - NUM_COLS * GAP) / NUM_COLS);

export default function PeriodicTable({ odu, categories, activeCategory, searchTerm, onCellClick }) {
  const reversedOdu = [...odu].reverse();

  const renderCell = (principalOdu, rowPos, keyPrefix) => {
    const ci           = principalOdu.id - 1;
    const secondaryOdu = secondaryAt(odu, ci, rowPos);
    const num          = cellNum(ci, rowPos);
    const dimmed       = calcDimmed(principalOdu, secondaryOdu, activeCategory, searchTerm);
    const color        = categories[principalOdu.category].color;
    const isMeji       = rowPos === 0;

    return (
      <OduCell
        key={keyPrefix + num}
        row={principalOdu}
        col={secondaryOdu}
        cellNum={num}
        color={color}
        isMeji={isMeji}
        isDimmed={dimmed}
        cellSize={CELL_SIZE}
        onPress={() => onCellClick({ row: principalOdu, col: secondaryOdu, num })}
      />
    );
  };

  return (
    <View style={styles.hScroll}>
      <ScrollView showsVerticalScrollIndicator style={styles.vScroll}>

        {/* Column headers */}
        <View style={styles.row}>
          {reversedOdu.map(apolOdu => (
            <View key={'ch-' + apolOdu.id} style={[styles.colHeader, { width: CELL_SIZE }]}>
              <Text style={[styles.colHeaderCat, { color: categories[apolOdu.category].color }]}>
                {apolOdu.id}
              </Text>
              <Text style={[styles.colHeaderName, { color: categories[apolOdu.category].color }]} numberOfLines={1}>
                {apolOdu.yoruba}
              </Text>
            </View>
          ))}
          {/* Corner */}
          <View style={[styles.corner, { width: ROW_HEADER_W }]}>
            <Text style={styles.cornerText}>IfaComp</Text>
            <Text style={styles.cornerSub}>Àmúlù-Odu</Text>
          </View>
        </View>

        {/* Rows */}
        {Array.from({ length: 16 }, (_, rowPos) => {
          if (rowPos === 0) {
            return (
              <View key="period-0">
                {/* Base Pair row — only Ogbe (ci=0) and Oyeku (ci=1) */}
                <View style={styles.row}>
                  {reversedOdu.map(pOdu => {
                    const ci = pOdu.id - 1;
                    return (ci === 0 || ci === 1)
                      ? renderCell(pOdu, 0, 'bp-')
                      : <View key={'bp-ph-' + ci} style={[styles.placeholder, { width: CELL_SIZE }]} />;
                  })}
                  <View style={[styles.rowHeader, styles.rowHeaderBasePair, { width: ROW_HEADER_W }]}>
                    <Text style={styles.rowHeaderBasePairText}>Ifa Base Pair</Text>
                  </View>
                </View>
                {/* IfaComp 1 row — 14 remaining Meji */}
                <View style={styles.row}>
                  {reversedOdu.map(pOdu => {
                    const ci = pOdu.id - 1;
                    return (ci === 0 || ci === 1)
                      ? <View key={'ic1-ph-' + ci} style={[styles.placeholder, { width: CELL_SIZE }]} />
                      : renderCell(pOdu, 0, 'ic1-');
                  })}
                  <View style={[styles.rowHeader, { width: ROW_HEADER_W }]}>
                    <Text style={styles.rowHeaderText}>IfaComp 1</Text>
                  </View>
                </View>
              </View>
            );
          }

          return (
            <View key={'period-' + rowPos} style={styles.row}>
              {reversedOdu.map(pOdu => renderCell(pOdu, rowPos, `r${rowPos}-`))}
              <View style={[styles.rowHeader, { width: ROW_HEADER_W }]}>
                <Text style={styles.rowHeaderText}>IfaComp {rowPos + 1}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hScroll: {
    flex: 1,
  },
  vScroll: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 2,
  },
  colHeader: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
  },
  colHeaderCat: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  colHeaderName: {
    fontSize: 7,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  corner: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border2,
    paddingLeft: 4,
  },
  cornerText: {
    fontSize: 7,
    fontWeight: '700',
    color: COLORS.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  cornerSub: {
    fontSize: 6,
    color: COLORS.text3,
    letterSpacing: 0.2,
  },
  rowHeader: {
    height: CELL_SIZE,
    justifyContent: 'center',
    paddingLeft: 6,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border2,
  },
  rowHeaderBasePair: {
    borderLeftColor: COLORS.primordial,
  },
  rowHeaderText: {
    fontSize: 7,
    fontWeight: '700',
    color: COLORS.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  rowHeaderBasePairText: {
    fontSize: 7,
    fontWeight: '700',
    color: COLORS.primordial,
    letterSpacing: 0.4,
  },
  placeholder: {
    height: CELL_SIZE,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    borderRadius: RADIUS.sm,
    borderStyle: 'dashed',
  },
});
