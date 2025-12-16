import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

const PurchaseFrequencyLoadError = () => {
  return (
    <Container>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>데이터를 불러올 수 없습니다</ErrorTitle>
      <ErrorMessage>
        날짜 범위를 확인하거나 잠시 후 다시 시도해주세요.
      </ErrorMessage>
    </Container>
  );
};

export default PurchaseFrequencyLoadError;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.foreground};
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.mutedForeground};
`;
