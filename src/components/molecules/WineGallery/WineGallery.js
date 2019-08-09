import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import breakpoints from '../../../styles/breakpoints';
import galleryArrowLeft from '../../../assets/images/icons/arrow-left.svg';
import galleryArrowRight from '../../../assets/images/icons/arrow-right.svg';

const StyledGallery = styled.div`
  ${breakpoints.xsUp} {
    margin-left: -10px;
    margin-right: -10px;
  }
  .slick-slide {
    ${breakpoints.smUp} {
      min-width: 263px;
    }
    ${breakpoints.smDown} {
      width: 100%;
      min-width: 240px;
      /* padding-left: 50px; */
    }
  }
  .slick-track {
    display: flex;
  }
  .slick-list {
    ${breakpoints.xsDown} {
      padding: 0px 50px 0px 0px !important;
    }
  }
  .slick-arrow {
    opacity: 1;
    z-index: 20;
    width: 24px;
    height: 12px;
    background-repeat: no-repeat;
    background-size: 24px 12px;
    background-position: 50% 50%;
    transform: translate(0, 0%);
    top: -55px;
    &:before {
      content: none;
    }
  }
  .slick-prev {
    right: 50px;
    left: auto;
    background-image: url(${galleryArrowLeft});
    &:hover,
    &:focus {
      background: url(${galleryArrowLeft});
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
  }
  .slick-next {
    right: 10px;
    background-image: url(${galleryArrowRight});
    &:hover,
    &:focus {
      background: url(${galleryArrowRight});
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
  }
`;

const WineGallery = props => {

  const { children } = props;

  const settings = {
    dots: false,
    arrows: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    infinite: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <StyledGallery>
      <Slider {...settings}>{children}</Slider>
    </StyledGallery>
  );
};

WineGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WineGallery;
