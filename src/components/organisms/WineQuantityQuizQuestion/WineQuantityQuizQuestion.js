import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './WineQuantityQuizQuestion.scss';

/**
 * Renders WineQuantityQuizQuestion component which allows Member to choose Wine Quantities as a part of
 * the Quiz.
 * */
class WineQuantityQuizQuestion extends Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    handleUpdateWineQuantity: PropTypes.func.isRequired,
    redBottles: PropTypes.number.isRequired,
    whiteBottles: PropTypes.number.isRequired,
    roseBottles: PropTypes.number.isRequired,
    sparklingBottles: PropTypes.number.isRequired,
  };

  /**
   * Handles change of Wine Quantity by executing method from the parent.
   *
   * @param {Object} event
   */
  handleChange = event => {
    const { handleUpdateWineQuantity } = this.props;
    const newValue = parseInt(event.target.value, 10);
    const fieldName = event.target.name;

    handleUpdateWineQuantity(fieldName, newValue);
  };

  render() {
    const {
      question, redBottles, whiteBottles, roseBottles, sparklingBottles,
    } = this.props;

    return (
      <div className="WineQuantityQuizQuestion">
        <div className="WineQuantityQuizQuestion--container">
          <div className="WineQuantityQuizQuestion--title">{question}</div>
          <div>
            <h3>{`Reds (${redBottles})`}</h3>
            <input
              id="redBottles"
              name="redBottles"
              value={redBottles}
              type="range"
              min="0"
              max="3"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h3>{`Whites (${whiteBottles})`}</h3>
            <input
              id="whiteBottles"
              name="whiteBottles"
              value={whiteBottles}
              type="range"
              min="0"
              max="3"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h3>{`Rose (${roseBottles})`}</h3>
            <input
              id="roseBottles"
              name="roseBottles"
              value={roseBottles}
              type="range"
              min="0"
              max="3"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h3>{`Sparkling (${sparklingBottles})`}</h3>
            <input
              id="sparklingBottles"
              name="sparklingBottles"
              value={sparklingBottles}
              type="range"
              min="0"
              max="3"
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WineQuantityQuizQuestion;
