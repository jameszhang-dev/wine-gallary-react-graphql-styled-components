/* eslint-disable react/prop-types */
import React from 'react';

import {
  DB_ID_ACTIVITY_TYPE_MONTHLY_RECOMMENDATIONS,
  DB_ID_ACTIVITY_TYPE_ORDERED_SUBSCRIPTION,
  DB_ID_ACTIVITY_TYPE_EARNED_BADGE,
  DB_ID_ACTIVITY_TYPE_RECEIVED_CREDIT,
  DB_ID_ACTIVITY_TYPE_EXTERNAL_ACTION,
  DB_ID_ACTIVITY_TYPE_ADDED_AS_FRIEND,
  DB_ID_ACTIVITY_TYPE_RECEIVED_COMMENT_ON_ACTIVITY,
  DB_ID_ACTIVITY_TYPE_AUTO_RATE_BOTTLES,
  DB_ID_ACTIVITY_TYPE_AUTO_FREE_SHIPPING,
  DB_ID_ACTIVITY_TYPE_AUTO_CONNECT_TO_FRIENDS,
  DB_ID_ACTIVITY_TYPE_AUTO_TASTES,
  DB_ID_ACTIVITY_TYPE_AUTO_GIVE_A_BOX,
  DB_ID_ACTIVITY_TYPE_AUTO_6_MONTHS,
  DB_ID_ACTIVITY_TYPE_AUTO_FEEDBACK,
  DB_ID_ACTIVITY_TYPE_AUTO_12_MONTHS,
} from './constants';

const TEMPLATES = {
  [DB_ID_ACTIVITY_TYPE_MONTHLY_RECOMMENDATIONS]: ({ wines }) => (
    <div>
      <p>{`We've recommended your monthly wines. They are: ${wines.map(wine => ` ${wine.name}`)}.`}</p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_ORDERED_SUBSCRIPTION]: ({ wines }) => (
    <div>
      <p>{`You just locked in this month's wine selection: ${wines.map(wine => ` ${wine.name}`)}.`}</p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_EARNED_BADGE]: ({ badgeName }) => (
    <div>
      <p>{`You earned the badge: ${badgeName}.`}</p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_RECEIVED_CREDIT]: ({ creditMessage }) => (
    <div>
      <p>{`You just won ${creditMessage} for being awesome.`}</p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_EXTERNAL_ACTION]: ({ externalActionName }) => (
    <div>
      <p>{`You ${externalActionName}.`}</p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_ADDED_AS_FRIEND]: ({ fromMemberName }) => (
    <div>
      <p>{`${fromMemberName} just added you as a wine friend.`}</p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_RECEIVED_COMMENT_ON_ACTIVITY]: ({ fromMemberName, activity }) => (
    <div>
      <p>{`${fromMemberName} just wrote a comment on your ${activity}.`}</p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_AUTO_RATE_BOTTLES]: ({ ratingsUrl }) => (
    <div>
      <p>
        {`Hey there, we want to keep learning about your special taste buds to make sure we pick
        bottles that you'll love. Make sure to`}
        <a href={ratingsUrl} target="_parent">rate your wines</a>
        {`as you go. and you'll earn points to use towards free bottles as well as chances to win
        extra prizes in your next box.`}
      </p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_AUTO_FREE_SHIPPING]: ({ freeShippingUrl }) => (
    <div>
      <p>
        {'You\'ve unlocked your next wine level. You can now get free-shipping! Head to'}
        <a href={freeShippingUrl} target="_parent">settings</a>
        {'to find out how.'}
      </p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_AUTO_CONNECT_TO_FRIENDS]: ({ dashboardUrl }) => (
    <div>
      <p>
        <a href={dashboardUrl} target="_parent">Connect</a>
        {` your Facebook account to follow all your friend's wine adventures. Including their favourite
        bottles, ratings, reviews and more!`}
      </p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_AUTO_TASTES]: ({ preferencesUrl }) => (
    <div>
      <p>
        {`Are we on the right track with your unique taste buds? If you're tough nut to crack and
        we're missing the mark, you can always update your`}
        <a href={preferencesUrl} target="_parent">wine preferences</a>
        {'.'}
      </p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_AUTO_GIVE_A_BOX]: ({ freeBoxUrl }) => (
    <div>
      <p>
        {'You\'ve just earned a very '}
        <a href={freeBoxUrl} target="_parent">special invite</a>
        {'! You can share the love and give out one free box to your wine loving bestie.'}
      </p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_AUTO_6_MONTHS]: () => (
    <div>
      <p>
        {`It's a big day, you've been with us for 6 months. Woo Hoo.
        Keep an eye our for a special thank you in your next box.`}
      </p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_AUTO_FEEDBACK]: ({ feedbackUrl }) => (
    <div>
      <p>
        {`You're one of our top winesquad members! So we want to know what you think.
        Would you mind helping us out by`}
        <a href={feedbackUrl} target="_parent">sharing your 2 cents about our service?</a>
      </p>
    </div>
  ),
  [DB_ID_ACTIVITY_TYPE_AUTO_12_MONTHS]: () => (
    <div>
      <p>
        {`What a happy day, you've been with us for 12 months. Amongst other things it means you have our
        undying love!`}
      </p>
    </div>
  ),
};

/**
 * Returns HTML with notification.
 *
 * @param activityTypeId - ID required for choosing the right template
 * @param context - data to be used to fill a template
 * @returns {*}
 */
const notificationProcessor = (activityTypeId, context) => TEMPLATES[activityTypeId](context);

export default notificationProcessor;
