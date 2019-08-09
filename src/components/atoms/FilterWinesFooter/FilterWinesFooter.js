import React from 'react';
import styled from 'styled-components';

import breakpoints from '../../../styles/breakpoints';
import { Button, ButtonOutline } from '../..';

const StyledFilterWinesFooter = styled.div`
  ${breakpoints.smUp} {
    display: none;
  }
  display: flex;
  flex-shrink: 0;
`;

const StyledFilterWinesFooterBtn = styled(Button)`
  flex: 1;
  margin-right: 10px;
`;

const StyledFilterWinesFooterBtnOutline = styled(ButtonOutline)`
  flex: 1;
`;

const FilterWinesFooter = () => (
  <StyledFilterWinesFooter>
    <StyledFilterWinesFooterBtn>Done</StyledFilterWinesFooterBtn>
    <StyledFilterWinesFooterBtnOutline>
      Clear filters
    </StyledFilterWinesFooterBtnOutline>
  </StyledFilterWinesFooter>
);

export default FilterWinesFooter;
