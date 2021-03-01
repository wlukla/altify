import styled from 'styled-components';

const Button = styled.button`
  padding: 4px 8px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.palette.primary.text};
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: 0.2s ease;

  :hover {
    background-color: ${({ theme }) => theme.palette.primary.text};
    color: ${({ theme }) => theme.palette.primary.main};
    border: 2px solid ${({ theme }) => theme.palette.secondary.text};
  }

  :focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px red;
  }

  :disabled {
    background-color: ${({ theme }) => theme.palette.primary.text};
    color: ${({ theme }) => theme.palette.primary.main};
    border: 2px solid ${({ theme }) => theme.palette.secondary.text};

    opacity: 0.6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 6px 10px;
    font-size: 15px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px 12px;
    font-size: 17px;
  }
`;

export default Button;
