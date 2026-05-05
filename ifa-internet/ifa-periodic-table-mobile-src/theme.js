// ─────────────────────────────────────────────────────────────
//  Ifa Periodic Table Mobile  ·  Theme Constants
//  Replaces CSS custom properties (--vars) with JS constants
// ─────────────────────────────────────────────────────────────
import { Dimensions } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Cell size scales with screen width (16 cols + row-header)
export const CELL = Math.floor(SCREEN_W / 18);

export const COLORS = {
  bg:        '#07090f',
  surface1:  '#0b1022',
  surface2:  '#0e1430',
  border1:   'rgba(255,255,255,0.08)',
  border2:   'rgba(255,255,255,0.05)',
  text:      '#e8eaf6',
  text2:     '#9aa3ba',
  text3:     '#4a5278',
  primary:   '#0036F7',
  primaryLt: '#3d6aff',
  gold:      '#c9a227',
  goldLt:    '#f5d978',
  // category colors
  primordial: '#c9a227',
  cognitive:  '#4361ee',
  vital:      '#e63946',
  social:     '#daa520',
  active:     '#2d9e6b',
  strategic:  '#5e72b4',
  sacred:     '#7c4dff',
  abundant:   '#e9498a',
};

export const FONTS = {
  xs:   10,
  sm:   12,
  base: 14,
  md:   16,
  lg:   18,
  xl:   22,
  xxl:  28,
};

export const RADIUS = {
  sm:  6,
  md:  10,
  lg:  16,
  full: 999,
};

export const SCREEN_W_VAL = SCREEN_W;
export const SCREEN_H_VAL = SCREEN_H;
