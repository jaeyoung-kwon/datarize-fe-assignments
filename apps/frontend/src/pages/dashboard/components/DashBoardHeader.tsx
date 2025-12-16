import styled from '@emotion/styled';

const DashBoardHeader = () => {
  return (
    <Container>
      <Title>쇼핑몰 구매 데이터 대시보드</Title>
      <Subtitle>2024년 7월 구매 데이터 분석</Subtitle>
    </Container>
  );
};

export default DashBoardHeader;

const Container = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
`;
