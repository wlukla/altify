import styled from 'styled-components';

const Button = styled.button`
  width: 11rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.palette.primary.text};
  font-weight: 600;

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
`;

export default Button;
