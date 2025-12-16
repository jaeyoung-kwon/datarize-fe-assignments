export const theme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    background: '#f6f7f9',
    foreground: '#0f172a',
    card: '#ffffff',
    cardForeground: '#0f172a',
    primary: '#1d365f',
    primaryLight: '#2c528f',
    primaryForeground: '#f8f9fb',
    secondary: '#f5f5f6',
    secondaryForeground: '#0f172a',
    muted: '#f5f5f6',
    mutedForeground: '#6d7380',
    accent: '#2db4a3',
    accentForeground: '#0f172a',
    destructive: '#ee5c5c',
    border: '#e5e6e8',
    input: '#e5e6e8',
    ring: '#1d365f',
  },
  gradients: {
    dashboard: 'linear-gradient(135deg, #1d365f 0%, #2c528f 100%)',
  },
  chartColors: [
    '#2db4a3',
    '#3fc2b1',
    '#51d0bf',
    '#63decd',
    '#3968a4',
    '#4077bb',
    '#5a89c5',
    '#749bce',
    '#7d5cc0',
    '#9270cc',
  ],
  radius: '0.75rem',
  shadows: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
    cardHover:
      '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
    tooltip: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transitions: {
    default: 'all 0.2s ease',
  },
};

export type AppTheme = typeof theme;
