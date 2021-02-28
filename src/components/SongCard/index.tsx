import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '../Button';
import playerService from '../../services/playerService';
import { playbackState } from '../../store/atoms';

interface IProps {
  id: string;
  name: string;
  duration: number;
  imgSrc: string;
  artists: string[];
  uri: string;
}

const SongCard: React.FC<IProps> = ({
  id,
  name,
  duration,
  imgSrc,
  artists,
  uri,
}) => {
  const [playerState] = useRecoilState(playbackState);

  const handleButtonClick = () => {
    playerService.play(uri);
  };

  const formattedDuration = useMemo(() => {
    const date = new Date(duration);
    const stringData = date.toISOString();

    return stringData.slice(14, -5);
  }, [duration]);

  const isDisabled = playerState?.track_window.current_track.id === id;

  return (
    <Main>
      <Image src={imgSrc} />
      <SongInfoContainer>
        <Title>{name}</Title>
        <Artists>{artists.join(', ')}</Artists>
        <Duration>Duration: {formattedDuration}</Duration>
      </SongInfoContainer>
      <ButtonContainer>
        <Button onClick={handleButtonClick} disabled={isDisabled}>
          {isDisabled ? 'Playing now' : 'Play'}
        </Button>
      </ButtonContainer>
    </Main>
  );
};

const Main = styled.article`
  padding: 0.5rem;
  width: 100%;
  height: 10rem;
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  box-shadow: 4px 7px 15px 0px rgba(0, 0, 0, 0.2);
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
  margin-bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Duration = styled.span`
  margin-top: auto;
`;

const Artists = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.secondary.text};
  opacity: 0.7;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default SongCard;
