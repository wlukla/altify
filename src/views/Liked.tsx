import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import LoadingIndicator from '../components/LoadingIndicator';
import SongsList from '../components/SongsList';
import Pagination from '../components/Pagination';
import apiService from '../services/apiService';
import { songsListState } from '../store/atoms';

const LikedView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [songs, setSongs] = useRecoilState(songsListState);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    const makeRequest = async () => {
      setIsPending(true);
      const res = await apiService.getLikedSongs((Number(slug) - 1) * 50);

      if (res) {
        setSongs(res);
      }
      setIsPending(false);
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
      {isPending && <LoadingIndicator />}
      {!isPending && songs && songs.items?.length && (
        <SongsList songs={songs.items} />
      )}
      <Pagination {...steps} baseLink="/liked" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
