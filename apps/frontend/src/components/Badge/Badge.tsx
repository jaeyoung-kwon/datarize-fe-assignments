import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

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
