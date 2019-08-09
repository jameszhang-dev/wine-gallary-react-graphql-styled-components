import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';

import { GET_ALL_SPECIAL_PACKS } from '../../graphql/queries';
import urlPatterns from '../../urls';

import './SpecialPacks.scss';

/**
 * Renders SpecialPacks component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SpecialPacks extends Component {
  static propTypes = {};

  static contextTypes = {};

  render() {

    return (
      <div className="SpecialPacks">
        <Query query={GET_ALL_SPECIAL_PACKS}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) console.error(`Shopping cart error! ${error.message}`);

            // Displays at the top of the list the available special packs
            const specialPackArray = data.allSpecialPackEditions
              .sort((a, b) => b.isAvailable - a.isAvailable);

            return (
              <section className="SpecialPacks--container">
                <div className="SpecialPacks--container__inner">
                  <h1>Special wine boxes selection</h1>
                  <h2 className="subtitle">
                    Sometimes we get our hands on some extra special bottles that don’t quite fit our normal
                    selection. And sometimes we want to celebrate something exciting. When this happens we
                    like to put together special packs so that everyone can join in the celebration.
                  </h2>
                  <div className="SpecialPacks--list">
                    {
                      specialPackArray.map(specialPack => (
                        <div className="SpecialPacks--item" key={specialPack.id}>
                          <div className="SpecialPacks--item--image">
                            <img
                              src={specialPack.heroTopImageLargeUrl}
                              alt={specialPack.section1Title}
                            />
                          </div>
                          <div className="SpecialPacks--item--description">
                            <h3>{specialPack.seoTitle}</h3>
                            <p>{specialPack.seoDescription}</p>
                            <Link
                              className="link-button"
                              to={urlPatterns.SPECIAL_PACK_DETAILS(specialPack.slug)}
                            >
                              {specialPack.isAvailable ? 'Order Now' : 'Sold-out. Register Interest!'}
                            </Link>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </section>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default SpecialPacks;
