import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import NextIcon from '../assets/icons/play-icon.svg';

interface IProps {
  currentStep: number;
  prevStep: number | null;
  nextStep: number | null;
  baseLink: string;
}

const Pagination: React.FC<IProps> = ({
  currentStep,
  nextStep,
  prevStep,
  baseLink,
}) => (
  <Wrapper>
    {prevStep && (
      <Link to={`${baseLink}/${prevStep}`}>
        <PrevIcon />
      </Link>
    )}
    <CurrentStepNumber>{currentStep}</CurrentStepNumber>
    {nextStep && (
      <Link to={`${baseLink}/${nextStep}`}>
        <NextIcon />
      </Link>
    )}
  </Wrapper>
);

const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrevIcon = styled(NextIcon)`
  transform: rotate(180deg);
`;

const CurrentStepNumber = styled.span`
  display: block;
  margin: 0 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primary.text};
`;

export default Pagination;
