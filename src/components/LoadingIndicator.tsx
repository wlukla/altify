import React from 'react';
import styled, { keyframes } from 'styled-components';

interface IProps {
  size?: number;
}

const LoadingIndicator: React.FC<IProps> = ({ size = 100 }) => {
  const radius = size / 2;

  return (
    <Svg viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <Circle cx={radius} cy={radius} r={radius * 0.9} radius={radius} />
    </Svg>
  );
};

const getDashValue = (radius: number, percentage: number): number =>
  2 * Math.PI * radius * (percentage / 100);

const svgAnimation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg)
  }
`;

const Svg = styled.svg`
  animation: 2s linear infinite ${svgAnimation};
  max-width: 100px;
`;

const circleAnimation = (radius: number) => keyframes`
  0%,
  25% {
    stroke-dashoffset: ${getDashValue(radius, 85)};
    transform: rotate(0);
  }
  
  50%,
  75% {
    stroke-dashoffset: ${getDashValue(radius, 20)};
    transform: rotate(45deg);
  }
  
  100% {
    stroke-dashoffset: ${getDashValue(radius, 85)};
    transform: rotate(360deg);
  }
`;

const Circle = styled.circle<{ radius: number }>`
  animation: 1.4s ease-in-out infinite both
    ${({ radius }) => circleAnimation(radius)};
  display: block;
  fill: transparent;
  stroke: ${({ theme }) => theme.palette.primary.text};
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 280;
  stroke-width: 10px;
  transform-origin: 50% 50%;
`;

export default LoadingIndicator;
