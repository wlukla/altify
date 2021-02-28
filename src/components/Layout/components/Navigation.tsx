import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Navigation: React.FC = () => (
  <Nav>
    <List>
      <ListItem>
        <Link to="/">Home</Link>
      </ListItem>
      <ListItem>
        <Link to="/login">Login</Link>
      </ListItem>
      <ListItem>
        <Link to="/favourites">Favourites</Link>
      </ListItem>
      <ListItem>
        <Link to="/albums">Albums</Link>
      </ListItem>
    </List>
  </Nav>
);

const Nav = styled.div`
  height: 100%;
`;

const List = styled.ul`
  height: 100%;
  padding: 0 0 0 4rem;
  margin: 0;
  display: flex;
  align-items: center;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;

  :not(:last-child) {
    margin-right: 1rem;
  }
`;

const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  padding: 0.5rem;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.secondary.text};

  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 2px solid transparent;

  transition: 0.2s ease;

  :hover {
    border: 2px solid ${({ theme }) => theme.palette.secondary.text};
  }
`;

export default Navigation;
