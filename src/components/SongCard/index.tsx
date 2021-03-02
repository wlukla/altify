import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '../Button';
import playerService from '../../services/playerService';
import apiService from '../../services/apiService';
import { playbackState, songsListState } from '../../store/atoms';

interface IProps {
  id: string;
  name: string;
  duration: number;
  imgSrc: string;
  artists: string[];
  uri: string;
  withLike?: boolean;
}

const SongCard: React.FC<IProps> = ({
  id,
  name,
  duration,
  imgSrc,
  artists,
  uri,
  withLike,
}) => {
  const [playerState] = useRecoilState(playbackState);
  const [songsList, setSongsList] = useRecoilState(songsListState);

  const handlePlayButtonClick = () => {
    playerService.play(uri);
  };

  const handleLikeButtonClick = async () => {
    await apiService.likeSong(id);
    const newSongs = await apiService.getLikedSongs();

    if (newSongs) {
      setSongsList(newSongs);
    }
  };

  const formattedDuration = useMemo(() => {
    const date = new Date(duration);
    const stringData = date.toISOString();

    return stringData.slice(14, -5);
  }, [duration]);

  const isDisabled = playerState?.track_window.current_track.id === id;

  const isLiked = useMemo(
    () => Boolean(songsList?.items.find((song) => song.track.id === id)),
    [id, songsList]
  );

  return (
    <Main>
      <Image src={imgSrc} />
      <SongInfoContainer>
        <Title>{name}</Title>
        <Artists>{artists.join(', ')}</Artists>
        <Duration>{formattedDuration}</Duration>
      </SongInfoContainer>
      <ButtonsContainer justify={withLike ? 'space-between' : 'flex-end'}>
        {withLike && (
          <Button disabled={isLiked} onClick={handleLikeButtonClick}>
            Like
          </Button>
        )}

        <Button onClick={handlePlayButtonClick} disabled={isDisabled}>
          {isDisabled ? 'Playing now' : 'Play'}
        </Button>
      </ButtonsContainer>
    </Main>
  );
};

const Main = styled.article`
  padding: 6px;
  width: 100%;
  height: 80px;
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  box-shadow: 4px 7px 15px 0px rgba(0, 0, 0, 0.2);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 120px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 150px;
  }
`;

const Image = styled.img``;

const SongInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 1rem;
  min-width: 0;
`;

const Title = styled.h2`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  font-size: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 20px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 24px;
  }
`;

const Duration = styled.span`
  margin-top: auto;
  font-size: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 14px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 16px;
  }
`;

const Artists = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.palette.secondary.text};
  opacity: 0.7;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 12px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 14px;
  }
`;

const ButtonsContainer = styled.div<{ justify: string }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify};
`;

export default SongCard;
