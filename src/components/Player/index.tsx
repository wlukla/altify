import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '../Button';
import playerService from '../../services/playerService';
import { playbackState } from '../../store/atoms';
import PlayIcon from '../../assets/icons/play-icon.svg';
import PauseIcon from '../../assets/icons/pause-icon.svg';

import PlaybackProgress from './components/PlaybackProgress';
import SongTitle from './components/SongTitle';

const Player: React.FC = () => {
  const [playerState, setPlayerState] = useRecoilState(playbackState);

  useEffect(() => {
    playerService.addPlayerStateListener((state: Spotify.PlaybackState) => {
      setPlayerState(state);
    });
  });

  const togglePlayback = () => {
    playerService.toggle();
  };

  return (
    <Wrapper>
      {playerState ? (
        <>
          <Image
            src={playerState.track_window.current_track.album.images[0].url}
          />
          <SongInfoContainer>
            <SongTitle
              name={playerState.track_window.current_track.name}
              artist={playerState.track_window.current_track.artists
                .map(({ name }) => name)
                .join(', ')}
            />
            <PlaybackProgress
              position={playerState.position}
              duration={playerState.duration}
            />
          </SongInfoContainer>
          <RoundButton onClick={togglePlayback}>
            {playerState.paused ? (
              <PlayIcon width={20} height={20} />
            ) : (
              <PauseIcon width={20} height={20} />
            )}
          </RoundButton>
        </>
      ) : (
        <InfoText>Pick some song!</InfoText>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 9999;

  background-color: ${({ theme }) => theme.palette.secondary.main};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 16px 26px;
    height: 100px;
  }
`;

const RoundButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  width: 50px;
`;

const Image = styled.img`
  height: 100%;
`;

const SongInfoContainer = styled.div`
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  min-width: 0;
`;

const InfoText = styled.span`
  font-weight: 600;
  width: 100%;
  text-align: center;
  font-size: 16px;
`;

export default Player;
