import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import authService from '../../services/authService';
import useLoginState from '../../hooks/useLogin';

import Navigation from './components/Navigation';

const Layout: React.FC = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useLoginState();

  const handleLogOutClick = () => {
    authService.logOut();
    setIsUserLoggedIn(false);
  };

  return (
    <AppContainer>
      <Header>
        <Navigation />

        {isUserLoggedIn && <Button onClick={handleLogOutClick}>Log out</Button>}
      </Header>
      <Main>{children}</Main>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  padding: 0 3rem;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Main = styled.main`
  width: 60%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Layout;
