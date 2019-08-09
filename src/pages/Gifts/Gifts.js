import React from 'react';

import styled from 'styled-components';

import breakpoints from '../../styles/breakpoints';
import Layout from '../../styles/layout';
import { fonts } from '../../styles/variables';
import giftHeroPicture from '../../assets/images/temp/hero-gift-1.svg';

import {
  HeaderGift,
  HeaderGiftTitle
} from '../../components';

const Gifts = () => (
  <Layout>
    <HeaderGift>
      <HeaderGiftTitle>Test</HeaderGiftTitle>    
    </HeaderGift>  
  </Layout>
);

export default Gifts;

