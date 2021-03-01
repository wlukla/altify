import styled from 'styled-components';

const Heading = styled.h1`
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.palette.secondary.text};

  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 28px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 32px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 36px;
  }
`;

export default Heading;
