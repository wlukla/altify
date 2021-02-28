import React from 'react';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Button from '../components/Button';
import apiService from '../services/authService';
import { signInState } from '../store/atoms';

const HomeView: React.FC = () => {
  const history = useHistory();
  const [isUserSignedIn] = useRecoilState(signInState);

  const handleButtonClick = () => {
    if (isUserSignedIn) {
      history.push('/liked');
    } else {
      apiService.startAuth();
    }
  };

  return (
    <Layout>
      <Heading>Altify - alternative Spotify client</Heading>
      <Subheading>Would you like to try it out?</Subheading>
      <Button type="button" onClick={handleButtonClick}>
        Jump in
      </Button>
    </Layout>
  );
};

const Heading = styled.h1`
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.palette.secondary.text};
`;

const Subheading = styled.span`
  margin-bottom: 2rem;
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.palette.secondary.text};
`;

export default HomeView;
