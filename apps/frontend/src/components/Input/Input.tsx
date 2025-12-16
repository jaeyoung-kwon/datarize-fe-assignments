import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

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
