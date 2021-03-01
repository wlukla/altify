import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from './Button';
import playerService from '../services/playerService';
import { playbackState } from '../store/atoms';
import PlayIcon from '../assets/icons/play-icon.svg';
import PauseIcon from '../assets/icons/pause-icon.svg';

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
        {playerState?.paused ? (
          <PlayIcon width={20} height={20} />
        ) : (
          <PauseIcon width={20} height={20} />
        )}
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
  margin: 0 12px;
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
