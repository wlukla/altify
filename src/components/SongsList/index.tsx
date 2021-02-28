import React from 'react';
import styled from 'styled-components';
import SongCard from '../SongCard';

interface IProps {
  songs: Record<string, unknown>[];
}

const SongsList: React.FC<IProps> = ({ songs }) => {
  return (
    <List>
      <ListItem>
        <SongCard
          imgSrc="https://i.scdn.co/image/ab67616d00001e025a4d5d9f724118698c9a25ff"
          name="test"
          duration={5000}
          artists={['M.I.M.E', 'test']}
        />
      </ListItem>
      <ListItem>
        <SongCard
          imgSrc="https://i.scdn.co/image/ab67616d00001e025a4d5d9f724118698c9a25ff"
          name="test"
          duration={5000}
          artists={['M.I.M.E', 'test']}
        />
      </ListItem>
    </List>
  );
};

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
