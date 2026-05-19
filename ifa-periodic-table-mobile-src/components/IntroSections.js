import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SCREEN_W_VAL } from '../theme';

// ─── IfaPT Intro text block ───────────────────────────────
export function IfaPTIntro() {
  return (
    <View style={styles.introWrap}>
      <Text style={styles.introBody}>
        The <Text style={styles.bold}>Ifa Periodic Table</Text>, or the{' '}
        <Text style={styles.italic}>Periodic Table of Everything (PToE)</Text>, extends
        chemistry's model to knowledge. Based on{' '}
        <Text style={styles.gold}>16 Ifa Axioms</Text>{' '}
        <Text style={styles.note}>(Oju Odu Ifa)</Text>, it classifies reality and all
        fields of knowledge by{' '}
        <Text style={styles.accent}>Ifa Energy Patterns</Text> or{' '}
        <Text style={styles.accent}>Ifa Energy Vibrations</Text>.
      </Text>

      {/* Stats bar */}
      <View style={styles.statsBar}>
        {[['256', 'Elements'], ['16', 'Groups'], ['16', 'Periods']].map(([n, l], i) => (
          <React.Fragment key={i}>
            {i > 0 && <View style={styles.statDivider} />}
            <View style={styles.stat}>
              <Text style={styles.statNum}>{n}</Text>
              <Text style={styles.statLbl}>{l}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>

      <Text style={styles.closing}>
        It serves as a unifying framework for all fields within the BaseField,{' '}
        <Text style={styles.gold}>IFA Mathematics</Text>.
      </Text>

      <View style={styles.expandedCard}>
        <View style={styles.expandedAccent} />
        <Text style={styles.expandedText}>
          The <Text style={styles.bold}>Ifa Periodic Table</Text> is a tool of the{' '}
          <Text style={styles.gold}>IFA Body of Knowledge (IFABOK)</Text>, also called the{' '}
          <Text style={styles.accent}>IFA Internet</Text>,{' '}
          <Text style={styles.gold}>IFA Mathematics</Text>, or the{' '}
          <Text style={styles.accent}>Theory of Everything (TOE)</Text> — for{' '}
          <Text style={styles.italic}>learning all fields mathematically</Text>,{' '}
          <Text style={styles.italic}>integrating all fields together</Text>, and{' '}
          <Text style={styles.italic}>building Ifa Technologies and Systems</Text>.
        </Text>
      </View>
    </View>
  );
}

// ─── Gallery images ───────────────────────────────────────
const IMG_W = SCREEN_W_VAL - 32;

export function IfaPTGallery() {
  return (
    <View style={styles.galleryWrap}>
      {/* Row 1: two side-by-side */}
      <View style={styles.galleryDuo}>
        <Image source={require('../assets/ifalang-master-character-ogbe.png')}
          style={[styles.galleryImg, { width: (IMG_W - 12) / 2 }]} resizeMode="contain" />
        <Image source={require('../assets/ifapt-four-forms.png')}
          style={[styles.galleryImg, { width: (IMG_W - 12) / 2 }]} resizeMode="contain" />
      </View>

      {/* Row 2: ifabit full-width */}
      <Image source={require('../assets/ifabit-bit-universe.png')}
        style={[styles.galleryImg, { width: IMG_W }]} resizeMode="contain" />
      <Text style={styles.caption}>The Dual Form of Ifa's Periodic Table</Text>

      {/* Row 3: compact + matrix */}
      <View style={styles.galleryDuo}>
        <View style={{ width: (IMG_W - 12) / 2 }}>
          <Image source={require('../assets/ifa-infinity-compact.png')}
            style={[styles.galleryImg, { width: '100%' }]} resizeMode="contain" />
          <Text style={styles.caption}>The Compact Form</Text>
        </View>
        <View style={{ width: (IMG_W - 12) / 2 }}>
          <Image source={require('../assets/ifalang-16-odu-matrix.png')}
            style={[styles.galleryImg, { width: '100%' }]} resizeMode="contain" />
          <Text style={styles.caption}>The Matrix Form</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Ifatom intro ─────────────────────────────────────────
export function IfatomIntro() {
  return (
    <View style={styles.sectionWrap}>
      <Image source={require('../assets/ifatom-diagram.png')}
        style={[styles.fullImg, { width: IMG_W }]} resizeMode="contain" />
      <Text style={styles.sectionDesc}>
        Ifatoms are the 256 Odu Ifa and are the most basic building blocks of all fields
        and disciplines of knowledge.
      </Text>
    </View>
  );
}

// ─── Reference images ─────────────────────────────────────
export function ReferenceImages() {
  const refs = [
    {
      src: require('../assets/ifa-ptoe-generalized.png'),
      caption: null,
    },
    {
      src: require('../assets/ifa-ptoe-knowledge-elements.png'),
      caption: null,
    },
    {
      src: require('../assets/acs-periodic-table.png'),
      caption: 'The Modern Form of Mendeleev's Periodic Table.',
    },
    {
      src: require('../assets/standard-model-particle-physics.png'),
      caption: 'The Standard Model of Particle Physics — The Periodic Table of Elementary Particles.',
    },
    {
      src: require('../assets/tenfold-topological-table.png'),
      caption: 'The periodic table of topological insulators and superconductors (tenfold classification).',
    },
  ];

  return (
    <View style={styles.refsWrap}>
      {refs.map((r, i) => (
        <View key={i} style={styles.refItem}>
          <Image source={r.src} style={[styles.fullImg, { width: IMG_W }]} resizeMode="contain" />
          {r.caption && <Text style={styles.caption}>{r.caption}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // ── IfaPTIntro ──
  introWrap: {
    backgroundColor: COLORS.surface1,
    borderTopWidth: 1,
    borderTopColor: COLORS.border1,
    padding: 20,
    alignItems: 'center',
    gap: 14,
  },
  introBody: {
    fontSize: FONTS.base,
    color: COLORS.text2,
    lineHeight: 22,
    textAlign: 'center',
  },
  bold: { fontWeight: '700', color: COLORS.text },
  italic: { fontStyle: 'italic', color: COLORS.text },
  gold: { fontWeight: '700', color: COLORS.gold },
  accent: { fontWeight: '700', color: COLORS.primaryLt },
  note: { fontSize: FONTS.xs, color: COLORS.text3 },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface2,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 0,
  },
  stat: { alignItems: 'center', flex: 1 },
  statNum: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.gold, lineHeight: 32 },
  statLbl: { fontSize: FONTS.xs, fontWeight: '600', color: COLORS.text3, textTransform: 'uppercase', letterSpacing: 0.5 },
  statDivider: { width: 1, height: 36, backgroundColor: COLORS.border1 },
  closing: { fontSize: FONTS.sm, color: COLORS.text2, textAlign: 'center', lineHeight: 20 },
  expandedCard: {
    borderWidth: 1,
    borderColor: COLORS.border2,
    borderRadius: RADIUS.md,
    padding: 16,
    backgroundColor: 'rgba(0,54,247,0.05)',
    position: 'relative',
  },
  expandedAccent: {
    position: 'absolute',
    left: 0,
    top: 12,
    bottom: 12,
    width: 3,
    borderRadius: 2,
    backgroundColor: COLORS.primaryLt,
  },
  expandedText: {
    fontSize: FONTS.sm,
    color: COLORS.text2,
    lineHeight: 22,
    paddingLeft: 10,
  },

  // ── Gallery ──
  galleryWrap: {
    backgroundColor: COLORS.surface1,
    borderTopWidth: 1,
    borderTopColor: COLORS.border2,
    padding: 16,
    gap: 12,
    alignItems: 'center',
  },
  galleryDuo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  galleryImg: {
    borderRadius: RADIUS.md,
  },
  caption: {
    fontSize: FONTS.xs,
    color: COLORS.text3,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },

  // ── Ifatom ──
  sectionWrap: {
    backgroundColor: COLORS.surface2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border1,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  fullImg: {
    borderRadius: RADIUS.md,
  },
  sectionDesc: {
    fontSize: FONTS.sm,
    color: COLORS.text2,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // ── References ──
  refsWrap: {
    backgroundColor: COLORS.bg,
    padding: 16,
    gap: 24,
    alignItems: 'center',
  },
  refItem: {
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border2,
    paddingTop: 24,
    width: '100%',
  },
});
