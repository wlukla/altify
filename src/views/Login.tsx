import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../components/Layout';
import authService from '../services/authService';

const LoginView: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const requestHandler = async (): Promise<void> => {
      const token = await authService.getToken();

      if (!token) {
        await authService.fetchToken();
      }

      history.push('/liked');
    };

    requestHandler();
  }, [history]);

  return (
    <Layout>
      <p>Logging in, you will be redirected just now!</p>
    </Layout>
  );
};

export default LoginView;
