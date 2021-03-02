import React, { useMemo } from 'react';
import styled from 'styled-components';

import toMMSS from '../../../utils/toMMSS';

interface IProps {
  position: number;
  duration: number;
}

const PlaybackProgress: React.FC<IProps> = ({ position, duration }) => {
  const innerWidth = `${(position / duration) * 100}%`;

  const currentTime = useMemo(() => toMMSS(position), [position]);
  const durationTime = useMemo(() => toMMSS(duration), [duration]);

  return (
    <Wrapper>
      <Outer>
        <Inner width={innerWidth} />
      </Outer>
      <TimeInfoContainer>
        <TimeIndicator>{currentTime}</TimeIndicator>
        <TimeIndicator>{durationTime}</TimeIndicator>
      </TimeInfoContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Outer = styled.div`
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Inner = styled.div<{ width: string }>`
  height: 100%;
  width: ${({ width }) => width};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.palette.primary.text};
`;

const TimeInfoContainer = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TimeIndicator = styled.span`
  font-size: 10px;
  opacity: 0.7;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 12px;
  }
`;

export default PlaybackProgress;
