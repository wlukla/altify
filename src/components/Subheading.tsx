import styled from 'styled-components';

const Subheading = styled.span`
  margin-bottom: 2rem;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.text};

  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 20px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 22px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 24px;
  }
`;

export default Subheading;
