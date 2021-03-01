import { useEffect } from 'react';
import { useRecoilState, SetterOrUpdater } from 'recoil';

import authService from '../services/authService';
import playerService from '../services/playerService';
import { playbackState, signInState } from '../store/atoms';

const useLogin = (): [boolean, SetterOrUpdater<boolean>] => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(signInState);
  const [, setPlayerState] = useRecoilState(playbackState);

  useEffect(() => {
    const loginHandler = async () => {
      const accessToken = await authService.getToken();
      if (accessToken) {
        await playerService.createPlayer(accessToken);
        playerService.startStateRefresh(setPlayerState);
      }

      setIsLoggedIn(Boolean(accessToken));
    };

    loginHandler();
  }, [setIsLoggedIn, setPlayerState]);

  return [isLoggedIn, setIsLoggedIn];
};

export default useLogin;
