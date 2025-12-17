import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

const NotFoundPage = () => {
  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Title>페이지를 찾을 수 없습니다</Title>
        <Description>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </Description>
        <HomeLink to="/">홈으로 돌아가기</HomeLink>
      </Content>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.gradients.dashboard};
  padding: 1rem;
`;

const Content = styled.div`
  text-align: center;
  max-width: 32rem;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.white};
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${theme.colors.white};
  opacity: 0.9;
  margin: 1rem 0 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${theme.colors.white};
  color: ${theme.colors.primary};
  font-weight: 600;
  border-radius: ${theme.radius};
  text-decoration: none;
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.cardHover};
  }
`;
