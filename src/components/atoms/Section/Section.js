import styled from 'styled-components';

import breakpoints from '../../../styles/breakpoints';

const Section = styled.div`
  position: relative;
  padding: 80px 0;
  ${breakpoints.smDown} {
    padding: 40px 0;
  }
`;

export default Section;
