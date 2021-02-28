import React from 'react';
import styled from 'styled-components';

import { Item } from '../../services/types';
import SongCard from '../SongCard';

interface IProps {
  songs: Item[];
}

const SongsList: React.FC<IProps> = ({ songs }) => (
  <List>
    {songs.map(({ track }) => (
      <ListItem key={track.id}>
        <SongCard
          id={track.id}
          imgSrc={track.album.images[1].url}
          name={track.name}
          duration={track.duration_ms}
          artists={track.artists.map(({ name }) => name)}
          uri={track.uri}
        />
      </ListItem>
    ))}
  </List>
);

const List = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListItem = styled.li`
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export default SongsList;
