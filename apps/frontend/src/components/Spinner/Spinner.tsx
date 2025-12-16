import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const Spinner = styled.div<{ size?: number }>`
  width: ${({ size = 24 }) => size}px;
  height: ${({ size = 24 }) => size}px;
  border: 2px solid ${theme.colors.primary};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
`;
