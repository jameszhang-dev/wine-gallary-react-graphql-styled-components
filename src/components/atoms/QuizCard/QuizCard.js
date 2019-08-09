import styled from 'styled-components';

import { colors } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const QuizCard = styled.a`
  ${breakpoints.smUp} {
    flex: 1;
    order: 2;
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
  padding: 130px 20px;
  border: 1px solid ${colors.white};
  box-shadow: 0px 0px 0px 1px ${colors.silver} inset;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  ${breakpoints.smDown} {
    padding: 50px 70px;
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  ${breakpoints.xsDown} {
    padding: 50px 40px;
  }
`;

export default QuizCard;
