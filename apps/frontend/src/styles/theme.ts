export const theme = {
  colors: {
    background: 'hsl(220, 20%, 97%)',
    foreground: 'hsl(222, 47%, 11%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(222, 47%, 11%)',
    primary: 'hsl(215, 50%, 23%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(220, 14%, 96%)',
    secondaryForeground: 'hsl(222, 47%, 11%)',
    muted: 'hsl(220, 14%, 96%)',
    mutedForeground: 'hsl(220, 9%, 46%)',
    accent: 'hsl(174, 62%, 47%)',
    accentForeground: 'hsl(222, 47%, 11%)',
    destructive: 'hsl(0, 84%, 60%)',
    border: 'hsl(220, 13%, 91%)',
    input: 'hsl(220, 13%, 91%)',
    ring: 'hsl(215, 50%, 23%)',
  },
  gradients: {
    dashboard: 'linear-gradient(135deg, hsl(215, 50%, 23%) 0%, hsl(215, 50%, 35%) 100%)',
  },
  chartColors: [
    'hsl(174, 62%, 47%)',
    'hsl(174, 62%, 52%)',
    'hsl(174, 62%, 57%)',
    'hsl(174, 62%, 62%)',
    'hsl(215, 50%, 45%)',
    'hsl(215, 50%, 50%)',
    'hsl(215, 50%, 55%)',
    'hsl(215, 50%, 60%)',
    'hsl(262, 52%, 55%)',
    'hsl(262, 52%, 60%)',
  ],
  radius: '0.75rem',
  shadows: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
    cardHover: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
    tooltip: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transitions: {
    default: 'all 0.2s ease',
  },
}

export type Theme = typeof theme
