import React from 'react';
import { Link } from 'react-router-dom';

import spotifyService from '../services/spotifyService';

const HomeView: React.FC = () => {
  const handleButtonClick = () => {
    spotifyService.startAuth();
  };

  return (
    <div>
      <Link to="/login">Login</Link>
      <button type="button" onClick={handleButtonClick}>
        Sign in
      </button>
    </div>
  );
};

export default HomeView;
