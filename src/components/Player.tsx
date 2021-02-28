import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from './Button';
import playerService from '../services/playerService';
import { playbackState } from '../store/atoms';

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
    <Main>
      <RoundButton onClick={togglePlayback}>
        {playerState?.paused ? <PlayIcon /> : <PauseIcon />}
      </RoundButton>
      {playerState && (
        <>
          <Image
            src={playerState.track_window.current_track.album.images[0].url}
          />
          <PlaybackProgress>
            <Outer>
              <Inner
                width={
                  playerState?.duration && playerState?.position
                    ? `${(playerState.position / playerState.duration) * 100}%`
                    : '0%'
                }
              />
            </Outer>
          </PlaybackProgress>
        </>
      )}
    </Main>
  );
};

const Main = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1rem 2rem;
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const PlayIcon = styled.div`
  margin-right: -3px;
  width: 20px;
  height: 20px;
  border-style: solid;
  border-width: 10px 0px 10px 20px;
  border-color: transparent transparent transparent
    ${({ theme }) => theme.palette.secondary.text};
`;

const PauseIcon = styled.div`
  margin-right: -2px;
  width: 20px;
  height: 20px;
  border-style: double;
  border-width: 0px 0px 0px 10px;
  border-color: ${({ theme }) => theme.palette.secondary.text};
`;

const RoundButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 3rem;
  width: 3rem;
`;

const Image = styled.img`
  height: 100%;
  margin: 0 0.5rem;
`;

const PlaybackProgress = styled.div`
  display: flex;
  flex: 1;
`;

const Outer = styled.div`
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Inner = styled.div<{ width: string }>`
  height: 100%;
  width: ${({ width }) => width};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.palette.primary.text};
`;

export default Player;
