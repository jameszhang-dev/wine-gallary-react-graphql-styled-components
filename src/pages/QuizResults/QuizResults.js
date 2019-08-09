import React from 'react';
import PropTypes from 'prop-types';

import { compose, graphql, Query } from 'react-apollo';

import { WineBox } from '../../components';
import { GET_SHOPPING_CART } from '../../graphql/queries';
import { SET_MEMBER_AUTH } from '../../graphql/resolvers/auth';
import urlPatterns from '../../urls';

import './QuizResults.scss';

/**
 * Renders QuizResults component.
 * */
const QuizResults = props => {
  const { history, setMemberAuth } = props;

  return (
    <div className="QuizResults">
      <div className="QuizResults--container">
        <h1 className="QuizResults--title">Recommended wines</h1>
        <Query query={GET_SHOPPING_CART} fetchPolicy="cache-and-network" partialRefetch>
          {({ loading, error, data }) => {

            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            // Sets member information to link state
            if (data.me) {
              setMemberAuth({
                variables: {
                  memberId: data.me.id,
                  token: localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE),
                },
              })
                .catch(errorMutation => {
                  console.error(errorMutation);
                });
            }

            const discountValue = data.me && data.me.shoppingCart && data.me.shoppingCart.discount;
            const discountMessage = discountValue && `(you have $${discountValue} discount!)`;

            return (
              <div className="QuizResults--recommendation-list">
                {data.me && <WineBox data={data} />}
                <div>
                  Starting at $69 per month for 3 bottles&nbsp;
                  {discountMessage && <p className="QuizResults--discount-message">{discountMessage}</p>}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => history.push(urlPatterns.CHECKOUT)}
                  >
                    {data.me.hasPendingGift ? 'redeem gift' : 'get my first box'}
                  </button>
                  <button
                    type="button"
                    onClick={() => history.push(urlPatterns.WINES_BOX)}
                  >
                    change or add wines
                  </button>
                </div>

              </div>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

QuizResults.propTypes = {
  history: PropTypes.shape({}).isRequired,
  setMemberAuth: PropTypes.func.isRequired,
};

QuizResults.defaultProps = {};

export default compose(
  graphql(
    SET_MEMBER_AUTH, {
      name: 'setMemberAuth',
    }
  ),
)(QuizResults);
