import React, { useEffect, useState } from 'react';

import spotifyService from '../services/spotifyService';

const FavouritesView: React.FC = () => {
  const [data, setData] = useState<Record<string, unknown> | void>();

  useEffect(() => {
    const makeRequest = async () => {
      const res = await spotifyService.getLikedSongs();

      setData(res);
    };

    makeRequest();
  }, []);

  return <p>{JSON.stringify(data, null, 4)}</p>;
};

export default FavouritesView;
