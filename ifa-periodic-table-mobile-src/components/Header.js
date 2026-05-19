import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';

export default function Header() {
  return (
    <View style={styles.wrap}>
      {/* Top bar */}
      <View style={styles.topbar}>
        <Text style={styles.topbarTitle}>The IFA Internet</Text>
      </View>
      {/* Main header row */}
      <View style={styles.inner}>
        {/* Left: logo + title */}
        <View style={styles.left}>
          <View style={styles.logoWrap}>
            <Image
              source={require('../assets/cenproject-logo.png')}
              style={styles.logoImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.h1}>Ifa Periodic Table</Text>
            <Text style={styles.sub}>IfaPT · ToEPT · CENProject</Text>
          </View>
        </View>
        {/* Right: stats */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>256</Text>
            <Text style={styles.statLbl}>Ifatoms</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>16</Text>
            <Text style={styles.statLbl}>IfaGroups</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>16</Text>
            <Text style={styles.statLbl}>IfaPeriods</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#0a0e1e',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border1,
  },
  topbar: {
    backgroundColor: 'rgba(0,36,200,0.32)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(61,106,255,0.2)',
    paddingVertical: 7,
    alignItems: 'center',
  },
  topbarTitle: {
    fontSize: FONTS.md,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: COLORS.gold,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  titleWrap: {
    flex: 1,
  },
  h1: {
    fontSize: FONTS.md,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  sub: {
    fontSize: FONTS.xs,
    color: COLORS.text3,
    letterSpacing: 0.5,
    marginTop: 1,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statNum: {
    fontSize: FONTS.lg,
    fontWeight: '800',
    color: COLORS.gold,
    lineHeight: 22,
  },
  statLbl: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.text2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
});
