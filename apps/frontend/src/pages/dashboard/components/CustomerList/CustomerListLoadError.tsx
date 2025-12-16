import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { TableCell, TableRow } from '@/components/Table';

const CustomerListLoadError = () => {
  return (
    <tbody>
      <TableRow>
        <ErrorCell colSpan={4} align="center">
          <Container>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle>검색 결과를 불러올 수 없습니다</ErrorTitle>
            <ErrorMessage>
              검색 키워드를 변경해보거나 잠시 후 다시 시도해주세요.
            </ErrorMessage>
          </Container>
        </ErrorCell>
      </TableRow>
    </tbody>
  );
};

export default CustomerListLoadError;

const ErrorCell = styled(TableCell)`
  height: 8rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
