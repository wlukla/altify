import { useEffect } from 'react';
import { useRecoilState, SetterOrUpdater } from 'recoil';

import authService from '../services/authService';
import playerService from '../services/playerService';
import { signInState } from '../store/atoms';

const useLoginState = (): [boolean, SetterOrUpdater<boolean>] => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(signInState);

  useEffect(() => {
    const loginHandler = async () => {
      const accessToken = await authService.getToken();
      if (accessToken) {
        await playerService.createPlayer(accessToken);
      }

      setIsLoggedIn(Boolean(accessToken));
    };

    loginHandler();
  }, [setIsLoggedIn]);

  return [isLoggedIn, setIsLoggedIn];
};

export default useLoginState;
