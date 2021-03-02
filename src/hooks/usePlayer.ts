import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import authService from '../services/authService';
import playerService from '../services/playerService';
import { authorizationState, playbackState } from '../store/atoms';

const usePlayer = (): void => {
  const isUserSignedIn = useRecoilValue(authorizationState);
  const setPlayerState = useSetRecoilState(playbackState);

  useEffect(() => {
    const authorizationStateChangeHandler = async () => {
      if (isUserSignedIn) {
        const token = await authService.getToken();

        await playerService.createPlayer(token);
        console.log('player created');
        playerService.startStateRefresh(setPlayerState);
      } else {
        playerService.destroyPlayer();
        playerService.stopStateRefresh();
      }
    };

    authorizationStateChangeHandler();
  }, [isUserSignedIn, setPlayerState]);
};

export default usePlayer;
