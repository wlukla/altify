import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import apiService from '../services/apiService';

const FavouritesView: React.FC = () => {
  const [data, setData] = useState<Record<string, unknown> | void>();

  useEffect(() => {
    const makeRequest = async () => {
      const res = await apiService.getLikedSongs();

      setData(res);
    };

    makeRequest();
  }, []);

  return (
    <Layout>
      <p>{JSON.stringify(data, null, 4)}</p>
    </Layout>
  );
};

export default FavouritesView;
