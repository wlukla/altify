import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import SongsList from '../components/SongsList';
import Pagination from '../components/Pagination';
import apiService from '../services/apiService';
import { songsListState } from '../store/atoms';

const LikedView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [songs, setSongs] = useRecoilState(songsListState);

  useEffect(() => {
    const makeRequest = async () => {
      const res = await apiService.getLikedSongs((Number(slug) - 1) * 50);

      if (res) {
        setSongs(res);
      }
    };

    makeRequest();
  }, [setSongs, slug]);

  const steps = useMemo<{
    prevStep: number | null;
    currentStep: number;
    nextStep: number | null;
  }>(() => {
    const numSlug = parseInt(slug, 10);

    return {
      prevStep: numSlug - 1 > 0 ? numSlug - 1 : null,
      currentStep: numSlug,
      nextStep:
        songs?.total && numSlug * 50 < songs?.total ? numSlug + 1 : null,
    };
  }, [slug, songs]);

  return (
    <Container>
      {songs && songs.items?.length && <SongsList songs={songs.items} />}
      <Pagination {...steps} baseLink="/liked" />
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
