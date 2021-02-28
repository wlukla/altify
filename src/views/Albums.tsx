import React, { useState, useEffect } from 'react';

import spotifyService from '../services/spotifyService';

const AlbumsView: React.FC = () => {
  const [data, setData] = useState<Record<string, unknown> | void>();

  useEffect(() => {
    const func = async () => {
      const res = await spotifyService.getUserAlbums();

      setData(res);
    };

    func();
  }, []);

  return <p>{JSON.stringify(data, null, 2)}</p>;
};

export default AlbumsView;
