import React from 'react';
import {
  View, Text, Modal, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions
} from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';

const SCREEN_H = Dimensions.get('window').height;

function ModalDot({ bit }) {
  return bit === 1
    ? <View style={styles.dot} />
    : <View style={[styles.dot, styles.dotZero]} />;
}

function IFABitDisplay({ code, rightLabel, leftLabel, color }) {
  const rightBits = code.slice(0, 4).split('').map(Number);
  const leftBits  = code.slice(4, 8).split('').map(Number);
  const decimal   = parseInt(code, 2);

  return (
    <View style={[styles.ifabit, { borderColor: color + '33' }]}>
      <View style={styles.ifabitCols}>
        {[{ bits: rightBits, label: rightLabel }, { bits: leftBits, label: leftLabel }].map(({ bits, label }, ci) => (
          <View key={ci} style={styles.ifabitCol}>
            <Text style={[styles.ifabitLabel, { color }]}>{label}</Text>
            {bits.map((b, i) => (
              <View key={i} style={styles.markRow}>
                {b === 1
                  ? <View style={[styles.dot, { backgroundColor: color }]} />
                  : <>
                      <View style={[styles.dot, styles.dotZero, { borderColor: color }]} />
                      <View style={[styles.dot, styles.dotZero, { borderColor: color, marginLeft: 3 }]} />
                    </>
                }
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.ifabitCode}>
        <Text style={styles.sectionLabel}>IFABit Code</Text>
        <Text style={[styles.codeText, { color }]}>{code}₂</Text>
        <Text style={styles.decimalText}>{decimal}₁₀</Text>
      </View>
    </View>
  );
}

function MejiDetail({ odu, cat, oduById, catMap, onNavigate }) {
  const color   = cat.color;
  const dualOdu = oduById[odu.dual];
  const dualCat = dualOdu ? catMap[dualOdu.category] : null;

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Ojú Odù · Meaning & Domain</Text>
        <Text style={styles.meaning}>{odu.meaning}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Core Domains</Text>
        <View style={styles.chips}>
          {odu.domains.map(d => (
            <View key={d} style={styles.domainChip}>
              <Text style={styles.domainChipText}>{d}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>IFABit · Àpólà Code</Text>
        <IFABitDisplay code={odu.code + odu.code} rightLabel={odu.name} leftLabel={odu.name} color={color} />
      </View>

      <View style={[styles.section, styles.infoGrid]}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Element</Text>
          <Text style={[styles.infoValue, { color }]}>{odu.element}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Planet</Text>
          <Text style={[styles.infoValue, { color }]}>{odu.planet}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>STEAMSEX Disciplines</Text>
        <View style={styles.chips}>
          {odu.steamsex.map(s => (
            <View key={s} style={[styles.domainChip, { borderColor: color + '55', backgroundColor: color + '12' }]}>
              <Text style={[styles.domainChipText, { color }]}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Ifa Periodicity Laws</Text>
        <View style={styles.chips}>
          {odu.axioms.map(a => (
            <View key={a} style={[styles.domainChip, { borderColor: color + '55' }]}>
              <Text style={[styles.domainChipText, { color: COLORS.text2 }]}>{a}</Text>
            </View>
          ))}
        </View>
      </View>

      {dualOdu && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Ifa Dual · Inverse Àpólà</Text>
          <TouchableOpacity
            style={[styles.dualRow, { borderColor: dualCat.color + '44' }]}
            onPress={() => onNavigate(dualOdu.id)}
          >
            <View style={[styles.dualBadge, { borderColor: dualCat.color }]}>
              <Text style={[styles.dualBadgeNum, { color: dualCat.color }]}>{dualOdu.id}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.dualName}>{dualOdu.meji}</Text>
              <Text style={styles.dualYoruba}>{dualOdu.yoruba} Méjì · {dualCat.label}</Text>
            </View>
            <Text style={[styles.dualArrow, { color: dualCat.color }]}>→</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

function CompositeDetail({ row, col, rowCat, colCat, onNavigate }) {
  const uniqueDomains  = [...new Set([...row.domains.slice(0,3), ...col.domains.slice(0,3)])];
  const uniqueSteamsex = [...new Set([...row.steamsex, ...col.steamsex])];

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Àmúlù Odù · Composite Ifatom</Text>
        <Text style={styles.meaning}>
          This Àmúlù Odù belongs to the{' '}
          <Text style={{ color: rowCat.color, fontWeight: '700' }}>Àpólà {row.name}</Text> IfaGroup,
          expressing the interplay between {row.domains.slice(0,2).join(', ')} (Right) and{' '}
          {col.domains.slice(0,2).join(', ')} (Left).
        </Text>
      </View>

      <View style={[styles.section, styles.infoGrid]}>
        <TouchableOpacity style={[styles.infoCard, styles.infoCardLink]} onPress={() => onNavigate(row.id)}>
          <Text style={[styles.infoLabel, { color: rowCat.color }]}>Àpólà · Right</Text>
          <Text style={styles.infoValue}>{row.meji}</Text>
          <Text style={styles.infoSub}>{row.domains.slice(0,3).join(' · ')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.infoCard, styles.infoCardLink]} onPress={() => onNavigate(col.id)}>
          <Text style={[styles.infoLabel, { color: colCat.color }]}>Period · Left</Text>
          <Text style={styles.infoValue}>{col.meji}</Text>
          <Text style={styles.infoSub}>{col.domains.slice(0,3).join(' · ')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Combined Domains</Text>
        <View style={styles.chips}>
          {uniqueDomains.map(d => (
            <View key={d} style={styles.domainChip}>
              <Text style={styles.domainChipText}>{d}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>IFABit · Àmúlù Composition</Text>
        <IFABitDisplay code={row.code + col.code} rightLabel={row.name} leftLabel={col.name} color={rowCat.color} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>STEAMSEX Disciplines</Text>
        <View style={styles.chips}>
          {uniqueSteamsex.map(s => (
            <View key={s} style={[styles.domainChip, { borderColor: rowCat.color + '55', backgroundColor: rowCat.color + '12' }]}>
              <Text style={[styles.domainChipText, { color: rowCat.color }]}>{s}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

export default function OduModal({ selection, odu, categories, onClose, onNavigate }) {
  const oduById = Object.fromEntries(odu.map(o => [o.id, o]));

  if (!selection) return null;

  const { row, col, num } = selection;
  const isMeji  = row.id === col.id;
  const rowCat  = categories[row.category];
  const colCat  = categories[col.category];
  const color   = rowCat.color;
  const name    = isMeji ? row.meji : `${row.name}-${col.name}`;
  const yoruba  = isMeji ? `${row.yoruba} Méjì · Ojú Odù` : `${row.yoruba}-${col.yoruba} · Àmúlù Odù`;
  const rowBits = row.code.split('').map(Number);
  const colBits = col.code.split('').map(Number);

  return (
    <Modal
      visible={!!selection}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity
          style={[styles.sheet, { borderColor: color + '55' }]}
          activeOpacity={1}
          onPress={() => {}}
        >
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={[styles.modalHeader, { borderBottomColor: color + '33' }]}>
            <View style={[styles.modalBadge, { borderColor: color }]}>
              <Text style={[styles.modalBadgeNum, { color }]}>{num}</Text>
              <View style={styles.badgeMarks}>
                <View style={styles.markCol}>
                  {rowBits.map((b, i) => <ModalDot key={i} bit={b} />)}
                </View>
                <View style={styles.markCol}>
                  {colBits.map((b, i) => <ModalDot key={i} bit={b} />)}
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.modalName}>{name}</Text>
              <Text style={styles.modalYoruba}>{yoruba}</Text>
              <View style={[styles.modalTag, { borderColor: color + '60', backgroundColor: color + '18' }]}>
                <Text style={[styles.modalTagText, { color }]}>
                  {isMeji ? rowCat.label + ' · IfaGroup ' + row.id : 'Àpólà ' + row.name + ' × ' + col.name}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {isMeji
              ? <MejiDetail odu={row} cat={rowCat} oduById={oduById} catMap={categories} onNavigate={onNavigate} />
              : <CompositeDetail row={row} col={col} rowCat={rowCat} colCat={colCat} onNavigate={onNavigate} />
            }
            <View style={{ height: 32 }} />
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0e1430',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    maxHeight: SCREEN_H * 0.9,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  modalBadge: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  modalBadgeNum: {
    fontSize: FONTS.sm,
    fontWeight: '800',
  },
  badgeMarks: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 2,
  },
  markCol: {
    gap: 2,
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'currentColor',
  },
  dotZero: {
    backgroundColor: 'transparent',
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  markRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  modalName: {
    fontSize: FONTS.lg,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  modalYoruba: {
    fontSize: FONTS.xs,
    color: COLORS.text3,
    marginTop: 3,
    letterSpacing: 0.3,
  },
  modalTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    marginTop: 6,
  },
  modalTagText: {
    fontSize: FONTS.xs,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    color: COLORS.text2,
    lineHeight: 22,
  },
  modalBody: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: FONTS.xs,
    fontWeight: '700',
    color: COLORS.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  meaning: {
    fontSize: FONTS.sm,
    color: COLORS.text2,
    lineHeight: 20,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  domainChip: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border1,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  domainChipText: {
    fontSize: FONTS.xs,
    color: COLORS.text2,
    fontWeight: '500',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: COLORS.surface1,
    borderRadius: RADIUS.md,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border1,
  },
  infoCardLink: {
    borderColor: COLORS.primaryLt + '33',
  },
  infoLabel: {
    fontSize: FONTS.xs,
    color: COLORS.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: FONTS.sm,
    fontWeight: '700',
    color: COLORS.text,
  },
  infoSub: {
    fontSize: FONTS.xs - 1,
    color: COLORS.text3,
    marginTop: 2,
  },
  ifabit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  ifabitCols: {
    flexDirection: 'row',
    gap: 12,
  },
  ifabitCol: {
    alignItems: 'center',
    gap: 3,
  },
  ifabitLabel: {
    fontSize: FONTS.xs,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  ifabitCode: {
    flex: 1,
  },
  codeText: {
    fontSize: FONTS.xl,
    fontWeight: '800',
    letterSpacing: 0.1,
    fontFamily: 'monospace',
  },
  decimalText: {
    fontSize: FONTS.xs,
    color: COLORS.text3,
    marginTop: 3,
  },
  dualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  dualBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dualBadgeNum: {
    fontSize: FONTS.sm,
    fontWeight: '800',
  },
  dualName: {
    fontSize: FONTS.sm,
    fontWeight: '700',
    color: COLORS.text,
  },
  dualYoruba: {
    fontSize: FONTS.xs,
    color: COLORS.text3,
    marginTop: 1,
  },
  dualArrow: {
    fontSize: FONTS.lg,
    fontWeight: '700',
  },
});
