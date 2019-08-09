import '../assets/fonts/BauPro/stylesheet.css';
import '../assets/fonts/Interstate/stylesheet.css';
import '../assets/fonts/Concept/stylesheet.css';

/* Colors */
export const colors = {
  white: '#ffffff',
  black: '#000000',
  burgundy: '#82314d',
  succes: '#94944A',
  succesThin: '#D6D6A6',
  purple: '#C7A8E0',
  purpleThin: '#E2D8EB',
  blue: '#CCE5FF',
  blueThin: '#DEEBF9',
  blueSoft: '#2E6ED4',
  warning: '#FFE000',
  warningThin: '#EFD880',
  tan: '#EBAB78',
  coral: '#FF9161',
  peach: '#FFE8D9',
  pink: '#FF9987',
  danger: '#E54533',
  silver: '#eaeaea',
};

export const baseColors = {
  baseColor: colors.black,
  baseLinkColor: colors.black,
  baseLinkHoverColor: colors.black,
};

/* Typography */
export const fonts = {
  fontBauRegular: 'BauPro-Regular',
  fontBauItalic: 'BauPro-Italic',
  fontBauMedium: 'BauPro-Medium',
  fontInterstateUltraBlack: 'Interstate-UltraBlack',
  fontInterstateBlackCompressed: 'Interstate-BlackCompressed',
  fontConceptRegular: 'Concept-Regular',
  fontConceptItalic: 'Concept-Italic',
};

export const typography = {
  baseFontItalic: fonts.fontBauItalic,
  baseFontMedium: fonts.fontBauMedium,
  baseFontSize: '14px',
  baseLineHeight: 1.4,
  baseFontFamily: fonts.fontBauRegular,
  titleLineHeight: 1.3,
  titleFontFamily: fonts.fontInterstateUltraBlack,
};

/* Transition */
export const transition = {
  baseTransition: 'all 200ms ease',
};

/* Header */
export const header = {
  desktopHeight: '80px',
  mobileHeight: '60px',
};

/* Desktop filter */
export const filterWines = {
  topMargin: header.desktopHeight,
  filterWidth: '420px',
  toggleButtonSize: '80px',
};
