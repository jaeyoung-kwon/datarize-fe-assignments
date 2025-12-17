import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

const CustomerDetailModalLoadError = () => {
  return (
    <Container>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>구매 내역을 불러올 수 없습니다</ErrorTitle>
      <ErrorMessage>잠시 후 다시 시도해주세요.</ErrorMessage>
    </Container>
  );
};

export default CustomerDetailModalLoadError;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  height: 8rem;
`;

const ErrorIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ErrorTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.foreground};
  margin-bottom: 0.25rem;
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.mutedForeground};
`;
