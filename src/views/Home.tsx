import React from 'react';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Button from '../components/Button';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
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
      <ButtonLarge type="button" onClick={handleButtonClick}>
        Jump in
      </ButtonLarge>
    </Layout>
  );
};

const ButtonLarge = styled(Button)`
  && {
    font-size: 24px;
    padding: 10px 24px;
  }
`;

export default HomeView;
