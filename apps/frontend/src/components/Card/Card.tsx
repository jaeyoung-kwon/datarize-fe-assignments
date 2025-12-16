import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { PropsWithChildren, ReactNode } from 'react';

interface CardProps {
  title: string;
  headerAction?: ReactNode;
  contentHeight?: number;
}

const Card = ({
  title,
  headerAction,
  contentHeight,
  children,
}: PropsWithChildren<CardProps>) => {
  return (
    <Container>
      <CardHeader>
        <HeaderRow>
          <CardTitle>{title}</CardTitle>
          {headerAction}
        </HeaderRow>
      </CardHeader>
      <CardContent contentHeight={contentHeight}>{children}</CardContent>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: 100%;
  background-color: ${theme.colors.card};
  border-radius: ${theme.radius};
  box-shadow: ${theme.shadows.card};
  animation: fadeIn 0.3s ease-out;
`;

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.foreground};
`;

const CardContent = styled.div<{ contentHeight?: number }>`
  width: calc(100% - 3rem);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  box-sizing: content-box;
  height: ${({ contentHeight }) =>
    contentHeight ? `${contentHeight}px` : 'auto'};
`;
