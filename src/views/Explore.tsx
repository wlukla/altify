import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Button from '../components/Button';

import Layout from '../components/Layout';
import SongCard from '../components/SongCard';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
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
        <ButtonLarge onClick={handleRandomSongClick} disabled={isPending}>
          Get random song!
        </ButtonLarge>
      </InfoContainer>
      {randomSong && (
        <SongCard
          id={randomSong.id}
          imgSrc={randomSong.album.images[1].url}
          name={randomSong.name}
          duration={randomSong.duration_ms}
          artists={randomSong.artists.map(({ name }) => name)}
          uri={randomSong.uri}
          withLike
        />
      )}
    </Layout>
  );
};
const InfoContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonLarge = styled(Button)`
  && {
    font-size: 24px;
    padding: 10px 24px;
  }
`;

export default ExploreView;
