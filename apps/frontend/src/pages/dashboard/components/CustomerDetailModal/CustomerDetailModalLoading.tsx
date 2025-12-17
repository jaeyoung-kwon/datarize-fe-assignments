import { Spinner } from '@/components/Spinner';
import styled from '@emotion/styled';

const CustomerDetailModalLoading = () => {
  return (
    <LoadingWrapper>
      <Spinner size={24} />
    </LoadingWrapper>
  );
};

export default CustomerDetailModalLoading;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 470px;
`;
