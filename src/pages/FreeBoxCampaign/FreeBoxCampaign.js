import PropTypes from 'prop-types';
import React from 'react';

import { compose, graphql } from 'react-apollo';

import { FreeBoxCampaignAction } from '../../components';
import { GET_FREE_BOX_CAMPAIGN } from '../../graphql/queries';

import './FreeBoxCampaign.scss';

/**
 * Renders the FreeBoxCampaign landing-page for the given campaign.
 * */
const FreeBoxCampaign = props => {

  const { history, freeBoxCampaignQuery } = props;

  if (freeBoxCampaignQuery.loading || !freeBoxCampaignQuery.freeBoxCampaign) return <div>Loading...</div>;

  const { freeBoxCampaign } = freeBoxCampaignQuery;

  return (
    <div className="FreeBoxCampaign">
      <div className="FreeBoxCampaign--container">
        <div className="FreeBoxCampaign--container__inner">

          {/* HERO BANNER */}
          <section className={`FreeBoxCampaign--hero-banner ${freeBoxCampaign.heroTopTheme}`}>
            <img
              className="FreeBoxCampaign--hero-banner__image"
              src={freeBoxCampaign.heroTopImageLargeUrl}
              alt={freeBoxCampaign.heroTopTitle}
            />
            <div className="FreeBoxCampaign--hero-banner__title">
              <h1>{freeBoxCampaign.heroTopTitle}</h1>
              <FreeBoxCampaignAction
                freeBoxCampaign={freeBoxCampaign}
                sellingMessage={
                  freeBoxCampaign.heroTopSubTitle
                    ? freeBoxCampaign.heroTopSubTitle
                    : freeBoxCampaign.heroMonthlyLimitReachedText
                }
                history={history}
              />
            </div>
          </section>

          {/* SECTION 1 */}
          <section className="FreeBoxCampaign--content">
            <div className="FreeBoxCampaign--content__title">
              <h2>{freeBoxCampaign.section1Title}</h2>
              <p>{freeBoxCampaign.section1Text}</p>
            </div>
            <div className="FreeBoxCampaign--content__image">
              <img
                className="FreeBoxCampaign--content__image"
                src={freeBoxCampaign.section1ImageLargeUrl}
                alt={freeBoxCampaign.section1Title}
              />
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="FreeBoxCampaign--content">
            <div className="FreeBoxCampaign--content__title">
              <h2>{freeBoxCampaign.section2Title}</h2>
              <p>{freeBoxCampaign.section2Text}</p>
            </div>
            <div className="FreeBoxCampaign--content__image">
              <img
                className="FreeBoxCampaign--content__image"
                src={freeBoxCampaign.section2ImageLargeUrl}
                alt={freeBoxCampaign.section2Title}
              />
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="FreeBoxCampaign--content">
            <div className="FreeBoxCampaign--content__title">
              <h2>{freeBoxCampaign.section3Title}</h2>
              <p>{freeBoxCampaign.section3Text}</p>
            </div>
            <div className="FreeBoxCampaign--content__image">
              <img
                src={freeBoxCampaign.section3ImageLargeUrl}
                alt={freeBoxCampaign.section3Title}
              />
            </div>
          </section>

          {/* SECTION BOTTOM */}
          <section className={`FreeBoxCampaign--content bottom ${freeBoxCampaign.heroBottomTheme}`}>
            <div className="FreeBoxCampaign--content__title">
              <h2>{freeBoxCampaign.heroBottomTitle}</h2>
              <FreeBoxCampaignAction
                freeBoxCampaign={freeBoxCampaign}
                sellingMessage={
                  freeBoxCampaign.heroTopSubTitle
                    ? freeBoxCampaign.heroBottomSubTitle
                    : freeBoxCampaign.heroMonthlyLimitReachedText
                }
                history={history}
              />
            </div>
            <div className="FreeBoxCampaign--content__image">
              <img
                src={freeBoxCampaign.heroBottomImageLargeUrl}
                alt={freeBoxCampaign.heroBottomSubTitle}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

FreeBoxCampaign.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  freeBoxCampaignQuery: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(GET_FREE_BOX_CAMPAIGN, {
    name: 'freeBoxCampaignQuery',
    options: props => ({
      variables: {
        seoCampaignName: props.match.params.seoCampaignName ? props.match.params.seoCampaignName : 'default',
      },
    }),
  }),
)(FreeBoxCampaign);
