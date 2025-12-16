import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

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
