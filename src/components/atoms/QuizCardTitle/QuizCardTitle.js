import styled from 'styled-components';

import { fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const QuizCardTitle = styled.p`
  font-size: 35px;
  line-height: 1;
  margin: 0;
  font-family: ${fonts.fontInterstateBlackCompressed};
  ${breakpoints.mdDown} {
    font-size: 26px;
  }
  ${breakpoints.smDown} {
    font-size: 35px;
  }
`;

export default QuizCardTitle;
