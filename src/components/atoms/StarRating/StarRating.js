import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './StarRating.scss';

/**
 * Renders StarRating component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class StarRating extends Component {
  static propTypes = {
    score: PropTypes.number,
    content: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    score: 0,
    content: null,
    onClick: null,
  };

  componentDidMount() {
  }

  handleClick = newScore => {
    const { onClick } = this.props;

    if (onClick) {
      onClick(newScore);
    }
  };

  render() {
    const { content, score } = this.props;

    return (
      <div className="StarRating">
        <span
          role="button"
          tabIndex="0"
          onClick={() => this.handleClick(1)}
          onKeyPress={() => this.handleClick(1)}
          className={score && score >= 1 ? 'selected star' : 'star'}
        >
          {content}
        </span>
        <span
          role="button"
          tabIndex="0"
          type="span"
          onClick={() => this.handleClick(2)}
          onKeyPress={() => this.handleClick(2)}
          className={score && score >= 2 ? 'selected star' : 'star'}
        >
          {content}
        </span>
        <span
          role="button"
          tabIndex="0"
          type="span"
          onClick={() => this.handleClick(3)}
          onKeyPress={() => this.handleClick(3)}
          className={score && score >= 3 ? 'selected star' : 'star'}
        >
          {content}
        </span>
        <span
          role="button"
          tabIndex="0"
          type="span"
          onClick={() => this.handleClick(4)}
          onKeyPress={() => this.handleClick(4)}
          className={score && score >= 4 ? 'selected star' : 'star'}
        >
          {content}
        </span>
        <span
          role="button"
          tabIndex="0"
          type="span"
          onClick={() => this.handleClick(5)}
          onKeyPress={() => this.handleClick(5)}
          className={score && score >= 5 ? 'selected star' : 'star'}
        >
          {content}
        </span>
      </div>
    );
  }
}

export default StarRating;
