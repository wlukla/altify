import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import apiService from '../services/apiService';
import SongsList from '../components/SongsList';
import { songsListState } from '../store/atoms';

const LikedView: React.FC = () => {
  const [songs, setSongs] = useRecoilState(songsListState);

  useEffect(() => {
    const makeRequest = async () => {
      const res = await apiService.getLikedSongs();

      if (res) {
        setSongs(res);
      }
    };

    makeRequest();
  }, [setSongs]);

  return (
    <Container>
      <SongsList songs={songs} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 14px 0 94px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px 0 120px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 0 144px;
  }
`;

export default LikedView;
