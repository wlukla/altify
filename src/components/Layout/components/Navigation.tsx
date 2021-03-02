import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { authorizationState } from '../../../store/atoms';

const Navigation: React.FC = () => {
  const [isUserLoggedId] = useRecoilState(authorizationState);

  return (
    <Nav>
      <List>
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        {isUserLoggedId && (
          <>
            <ListItem>
              <Link to="/liked/1">Liked</Link>
            </ListItem>
            <ListItem>
              <Link to="/explore">Explore</Link>
            </ListItem>
          </>
        )}
      </List>
    </Nav>
  );
};

const Nav = styled.nav`
  height: 100%;
`;

const List = styled.ul`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;

  :not(:last-child) {
    margin-right: 4px;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-right: 12px;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-right: 20px;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      margin-right: 26px;
    }
  }
`;

const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.secondary.text};

  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 2px solid transparent;

  transition: 0.2s ease;

  :hover {
    border: 2px solid ${({ theme }) => theme.palette.secondary.text};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 6px;
    font-size: 15px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px;
    font-size: 17px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 21px;
  }
`;

export default Navigation;
