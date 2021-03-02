import React from 'react';
import styled from 'styled-components';

interface IProps {
  name: string;
  artist: string;
}

const SongTitle: React.FC<IProps> = ({ name, artist }) => (
  <Wrapper>
    <SongName>{name}</SongName>
    <Artist>{artist}</Artist>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const SongName = styled.span`
  font-weight: 600;
  font-size: 14px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

const Artist = styled.span`
  font-size: 12px;
  opacity: 0.9;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

export default SongTitle;
