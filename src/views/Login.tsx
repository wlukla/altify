import React, { useEffect } from 'react';

import spotifyService from '../services/spotifyService';

const LoginView: React.FC = () => {
  useEffect(() => {
    spotifyService.getToken();
  }, []);

  return <p>Login</p>;
};

export default LoginView;
