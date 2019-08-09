import styled from 'styled-components';

import breakpoints from '../../../styles/breakpoints';

export const ContainerFluid = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Container = styled(ContainerFluid)`
  margin: 0 auto;
  ${breakpoints.xsUp} {
    max-width: 540px;
  }
  ${breakpoints.smUp} {
    max-width: 720px;
  }
  ${breakpoints.mdUp} {
    max-width: 960px;
  }
  ${breakpoints.lgUp} {
    max-width: 1140px;
  }
`;
