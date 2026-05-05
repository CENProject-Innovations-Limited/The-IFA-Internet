import React, { useState, useCallback } from 'react';
import {
  View, ScrollView, StatusBar, SafeAreaView, StyleSheet, Text
} from 'react-native';
import { COLORS } from './theme';
import oduData from './data/odu.json';

import Header         from './components/Header';
import Controls       from './components/Controls';
import PeriodicTable  from './components/PeriodicTable';
import ListView       from './components/ListView';
import OduModal       from './components/OduModal';
import DualLaws       from './components/DualLaws';
import {
  IfaPTIntro,
  IfaPTGallery,
  IfatomIntro,
  ReferenceImages,
} from './components/IntroSections';

export default function App() {
  const { odu, categories } = oduData;

  const [category,  setCategory]  = useState('all');
  const [search,    setSearch]    = useState('');
  const [view,      setView]      = useState('table');
  const [selection, setSelection] = useState(null);

  const navigateTo = useCallback(id => {
    const o = odu.find(x => x.id === id);
    if (o) setSelection({ row: o, col: o, num: o.id });
  }, [odu]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Fixed Header */}
      <Header />

      {/* Sticky Controls */}
      <Controls
        categories={categories}
        activeCategory={category}
        onCategory={setCategory}
        searchTerm={search}
        onSearch={setSearch}
        view={view}
        onView={setView}
      />

      {/* Main scroll area */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* Intro */}
        <IfaPTIntro />
        <IfaPTGallery />

        {/* Table / List */}
        <View style={[styles.tableWrap, { paddingHorizontal: view === 'table' ? 6 : 0 }]}>
          {view === 'table'
            ? <PeriodicTable
                odu={odu}
                categories={categories}
                activeCategory={category}
                searchTerm={search}
                onCellClick={setSelection}
              />
            : <ListView
                odu={odu}
                categories={categories}
                activeCategory={category}
                searchTerm={search}
                onSelect={setSelection}
              />
          }
        </View>

        {/* Lower sections */}
        <DualLaws categories={categories} />
        <IfatomIntro />
        <ReferenceImages />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ifa Periodic Table · CENProject · 256 Ifatoms
          </Text>
        </View>
      </ScrollView>

      {/* Modal */}
      <OduModal
        selection={selection}
        odu={odu}
        categories={categories}
        onClose={() => setSelection(null)}
        onNavigate={navigateTo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  tableWrap: {
    flex: 1,
    paddingVertical: 10,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border1,
    marginTop: 24,
  },
  footerText: {
    fontSize: 11,
    color: COLORS.text3,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
