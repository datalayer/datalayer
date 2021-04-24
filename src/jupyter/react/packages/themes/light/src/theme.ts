import { createMuiTheme } from '@material-ui/core/styles';

import { Direction, ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';
import createBreakpoints, { BreakpointsOptions } from '@material-ui/core/styles/createBreakpoints';
import createMixins, { Mixins } from '@material-ui/core/styles/createMixins';
import createPalette, { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';
import createTypography, { Typography, TypographyOptions } from '@material-ui/core/styles/createTypography';
import shadows, { Shadows } from '@material-ui/core/styles/shadows';
import shape, { Shape } from '@material-ui/core/styles/shape';
import createSpacing, { Spacing } from '@material-ui/core/styles/createSpacing';
import { Transitions } from '@material-ui/core/styles/transitions';
import { ZIndex } from '@material-ui/core/styles/zIndex';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';

import red from '@material-ui/core/colors/red';

const direction: Direction = 'ltr';

const breakpoints: BreakpointsOptions = createBreakpoints({
  unit: 'px',
  step: 2
});

const palette: Palette = createPalette({
  primary: {
    light: "#fff",
    main: "#fff",
    dark: "#fff",
    contrastText: "#91f"
  },
  secondary: {
    light: "#fff",
    main: '#19857b',
    dark: "#fff",
    contrastText: "#91f"
  },
  error: {
    light: "#fff",
    main: red.A400,
    dark: "#fff",
    contrastText: "#91f"
  },
  background: {
    default: '#fff',
    paper: "#fff"
  },
});

// const shadows: Partial<Shadows> = [];

// const shape: Partial<Shape> = {};

const spacing: Spacing = createSpacing(1);

const transitions: Partial<Transitions> = {};

const typography: Partial<Typography> = createTypography(palette, {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  // The default font size of the Material Specification.
  fontSize: 14, // px
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  // Tell Material-UI what's the font-size on the html element.
  // 16px is the default font-size used by browsers.
  htmlFontSize: 16,
  // Apply the CSS properties to all the variants.
  allVariants: {
    textTransform: 'inherit'
  }
});

const zIndex: Partial<ZIndex> = {};

const mixins: Partial<Mixins> = {};

const overrides: Partial<Overrides> = {};

const props: ComponentsProps = {};

const themeOptions: ThemeOptions = {
  breakpoints: breakpoints,
  shape: shape,
  direction: direction,
  mixins: mixins,
  overrides: overrides,
  palette: palette,
  props: props,
  shadows: shadows,
  spacing: spacing,
  transitions: transitions,
  typography: typography,
  zIndex: zIndex
};

const theme: Theme = createMuiTheme(themeOptions);

export default theme;
