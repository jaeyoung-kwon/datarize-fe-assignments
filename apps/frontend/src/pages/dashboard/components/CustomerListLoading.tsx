import { Spinner } from '@/components/Spinner';
import { TableCell, TableRow } from '@/components/Table';
import styled from '@emotion/styled';

const CustomerListLoading = () => {
  return (
    <tbody>
      <TableRow>
        <LoadingCell colSpan={4} align="center">
          <LoadingWrapper>
            <Spinner size={24} />
          </LoadingWrapper>
        </LoadingCell>
      </TableRow>
    </tbody>
  );
};

export default CustomerListLoading;

const LoadingCell = styled(TableCell)`
  height: 8rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
