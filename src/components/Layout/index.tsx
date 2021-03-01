import React from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import useLogin from '../../hooks/useLogin';

import authService from '../../services/authService';
import { signInState } from '../../store/atoms';
import Button from '../Button';
import Player from '../Player';

import Navigation from './components/Navigation';

const Layout: React.FC = ({ children }) => {
  useLogin();

  const history = useHistory();
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(signInState);

  const handleLogOutClick = () => {
    authService.logOut();
    setIsUserLoggedIn(false);
    history.push('/');
  };

  return (
    <AppContainer>
      <Header>
        <Navigation />

        {isUserLoggedIn && <Button onClick={handleLogOutClick}>Log out</Button>}
      </Header>
      <Main>{children}</Main>
      {isUserLoggedIn && <Player />}
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
  position: sticky;
  top: 0;
  left: 0;
  padding: 0 16px;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 9999;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 32px;
    height: 70px;
  }
`;

const Main = styled.main`
  width: 100%;
  padding: 0 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 60%;
  }
`;

export default Layout;
