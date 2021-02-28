import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Layout from '../components/Layout';
import apiService from '../services/apiService';
import SongsList from '../components/SongsList';
import { songsListState } from '../store/atoms';

const LikedView: React.FC = () => {
  const [songs, setSongs] = useRecoilState(songsListState);

  useEffect(() => {
    const makeRequest = async () => {
      const res = await apiService.getLikedSongs();

      if (res) {
        setSongs(res);
      }
    };

    makeRequest();
  }, [setSongs]);

  return (
    <Layout>
      <SongsList songs={songs} />
    </Layout>
  );
};

export default LikedView;
