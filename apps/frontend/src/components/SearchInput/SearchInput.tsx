import Search from '#/search.svg?react';
import { Input } from '@/components/Input';
import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

export const SearchInput = ({ width, ...props }: SearchInputProps) => {
  return (
    <SearchWrapper width={width}>
      <SearchIcon>
        <Search style={{ width: '1rem' }} />
      </SearchIcon>
      <StyledInput {...props} />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div<{ width?: string }>`
  position: relative;
  width: ${({ width }) => width || '100%'};

  @media (min-width: 640px) {
    width: ${({ width }) => width || '16rem'};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const StyledInput = styled(Input)`
  padding-left: 2.25rem;
`;
