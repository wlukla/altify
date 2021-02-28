import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout';
import apiService from '../services/apiService';

const AlbumsView: React.FC = () => {
  const [data, setData] = useState<Record<string, unknown> | void>();

  useEffect(() => {
    const func = async () => {
      const res = await apiService.getUserAlbums();

      setData(res);
    };

    func();
  }, []);

  return (
    <Layout>
      <p>{JSON.stringify(data, null, 2)}</p>
    </Layout>
  );
};

export default AlbumsView;
