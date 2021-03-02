import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import authService from '../services/authService';
import { playbackState, authorizationState } from '../store/atoms';

const useAuthorization = (): void => {
  const setAuthorizationState = useSetRecoilState(authorizationState);
  const setPlayerState = useSetRecoilState(playbackState);

  useEffect(() => {
    const loginHandler = async () => {
      const accessToken = await authService.getToken();

      setAuthorizationState(Boolean(accessToken));
    };

    loginHandler();
  }, [setAuthorizationState, setPlayerState]);
};

export default useAuthorization;
