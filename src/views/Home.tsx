import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Button from '../components/Button';
import spotifyService from '../services/authService';

const HomeView: React.FC = () => {
  const handleButtonClick = () => {
    spotifyService.startAuth();
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
