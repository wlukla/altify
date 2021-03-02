import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import authService from '../services/authService';
import { authorizationState } from '../store/atoms';

const LoginView: React.FC = () => {
  const history = useHistory();
  const setIsUserLoggedIn = useSetRecoilState(authorizationState);

  useEffect(() => {
    const requestHandler = async (): Promise<void> => {
      const token = await authService.getToken();

      if (!token) {
        await authService.fetchToken();
        setIsUserLoggedIn(true);
      }

      history.replace('/liked');
    };

    requestHandler();
  }, [history, setIsUserLoggedIn]);

  return <p>Logging in, you will be redirected just now!</p>;
};

export default LoginView;
