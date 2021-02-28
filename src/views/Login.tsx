import React, { useEffect } from 'react';

import Layout from '../components/Layout';
import authService from '../services/authService';

const LoginView: React.FC = () => {
  useEffect(() => {
    authService.getToken();
  }, []);

  return (
    <Layout>
      <p>Logging in, you will be redirected just now!</p>
    </Layout>
  );
};

export default LoginView;
