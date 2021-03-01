import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Button from '../components/Button';

import Layout from '../components/Layout';
import SongCard from '../components/SongCard';
import { randomSongState } from '../store/atoms';
import apiService from '../services/apiService';

const ExploreView: React.FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const [randomSong, setRandomSong] = useRecoilState(randomSongState);

  const handleRandomSongClick = async () => {
    setIsPending(true);
    const song = await apiService.getRandomTrack();
    if (song) {
      setRandomSong(song);
    }
    setIsPending(false);
  };

  return (
    <Layout>
      <InfoContainer>
        <Heading>Random songs</Heading>
        <Subheading>Want to explore Spotify tracks world?</Subheading>
        <Button onClick={handleRandomSongClick} disabled={isPending}>
          Get random song!
        </Button>
      </InfoContainer>
      {randomSong && (
        <SongCard
          id={randomSong.id}
          imgSrc={randomSong.album.images[1].url}
          name={randomSong.name}
          duration={randomSong.duration_ms}
          artists={randomSong.artists.map(({ name }) => name)}
          uri={randomSong.uri}
        />
      )}
    </Layout>
  );
};
const InfoContainer = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export default ExploreView;
