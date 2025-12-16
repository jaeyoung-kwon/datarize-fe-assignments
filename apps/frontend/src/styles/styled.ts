import styled from '@emotion/styled';
import { theme } from './theme';

// Card Components
export const Card = styled.div`
  width: 100%;
  background-color: ${theme.colors.card};
  border-radius: ${theme.radius};
  box-shadow: ${theme.shadows.card};
  animation: fadeIn 0.3s ease-out;
`;

export const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.foreground};
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

// Button Components
export const Button = styled.button<{
  variant?: 'primary' | 'outline' | 'ghost';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: calc(${theme.radius} - 4px);
  cursor: pointer;
  transition: ${theme.transitions.default};
  font-family: inherit;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'outline':
        return `
          background-color: transparent;
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.foreground};
          &:hover {
            background-color: ${theme.colors.muted};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          border: none;
          color: ${theme.colors.foreground};
          &:hover {
            background-color: ${theme.colors.muted};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          border: none;
          color: ${theme.colors.primaryForeground};
          &:hover {
            background-color: hsl(215, 50%, 28%);
          }
        `;
    }
  }}
`;

// Input Components
export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid ${theme.colors.input};
  border-radius: calc(${theme.radius} - 4px);
  background-color: transparent;
  color: ${theme.colors.foreground};
  font-family: inherit;
  transition: ${theme.transitions.default};

  &::placeholder {
    color: ${theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.ring};
    box-shadow: 0 0 0 2px ${theme.colors.ring}20;
  }
`;

// Table Components
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

export const TableHeader = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ clickable?: boolean; striped?: boolean }>`
  transition: ${theme.transitions.default};

  ${({ clickable }) =>
    clickable &&
    `
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.accent}15;
    }
  `}

  ${({ striped }) =>
    striped &&
    `
    &:nth-of-type(odd) {
      background-color: ${theme.colors.background};
    }
    &:nth-of-type(even) {
      background-color: ${theme.colors.muted}50;
    }
  `}
`;

export const TableHead = styled.th<{ align?: 'left' | 'center' | 'right' }>`
  padding: 0.75rem 1rem;
  font-weight: 600;
  text-align: ${({ align = 'left' }) => align};
  background-color: ${theme.colors.muted}80;
  color: ${theme.colors.foreground};
`;

export const TableCell = styled.td<{ align?: 'left' | 'center' | 'right' }>`
  padding: 0.75rem 1rem;
  text-align: ${({ align = 'left' }) => align};
  border-bottom: 1px solid ${theme.colors.border};
`;

// Badge Component
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  padding: 0.125rem 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: ${theme.colors.accent}30;
  color: ${theme.colors.accentForeground};
`;

// Spinner Component
export const Spinner = styled.div<{ size?: number }>`
  width: ${({ size = 24 }) => size}px;
  height: ${({ size = 24 }) => size}px;
  border: 2px solid ${theme.colors.primary};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
`;

// Flex Utilities
export const FlexRow = styled.div<{
  gap?: number;
  align?: string;
  justify?: string;
}>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap = 0 }) => gap}rem;
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
`;

export const FlexColumn = styled.div<{
  gap?: number;
  align?: string;
  justify?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap = 0 }) => gap}rem;
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
`;

// Container
export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

// Separator
export const Separator = styled.div`
  height: 1px;
  background-color: ${theme.colors.border};
  margin: 1rem 0;
`;

// Text Utilities
export const Text = styled.span<{
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: number;
  color?: keyof typeof theme.colors;
  truncate?: boolean;
}>`
  font-size: ${({ size = 'base' }) => {
    const sizes = {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    };
    return sizes[size];
  }};
  font-weight: ${({ weight = 400 }) => weight};
  color: ${({ color }) => (color ? theme.colors[color] : 'inherit')};
  ${({ truncate }) =>
    truncate &&
    `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;
