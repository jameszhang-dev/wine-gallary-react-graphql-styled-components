const trackingEvents = {
  TRACKING_EVENT_LOGGED_IN: 'logged_in',
  TRACKING_EVENT_SIGNED_UP: 'signed_up',
  TRACKING_EVENT_STARTED_QUIZ: 'started_quiz',
  TRACKING_EVENT_ANSWERED_QUIZ_QUESTION: 'answered_quiz_question',
  TRACKING_EVENT_COMPLETED_QUIZ: 'completed_quiz',
  TRACKING_EVENT_INVITED_FRIEND: 'invited_friend',
  TRACKING_EVENT_CREDIT_ADDED: 'credit_added',
  TRACKING_EVENT_ADDED_EXTERNAL_ACTION: 'added_external_action',
  TRACKING_EVENT_PAYMENT_FAILED: 'payment_failed',
  TRACKING_EVENT_REQUESTED_PASSWORD_RESET: 'requested_password_reset',
  TRACKING_EVENT_REQUESTED_EMAIL_UPDATE_CONFIRMATION: 'requested_email_update_confirmation',
  TRACKING_EVENT_UPDATED_SUBSCRIPTION_STATUS: 'updated_subscription_status',
  TRACKING_EVENT_SUBMITTED_PAYMENT_PAGE: 'submitted_payment_page',
  TRACKING_EVENT_PLACED_ORDER: 'placed_order',
  TRACKING_EVENT_SHIPPED_ORDER_TO_GIFT_RECIPIENT: 'shipped_order_to_gift_recipient',
  TRACKING_EVENT_RECEIVED_GIFT_DIY_EMAIL: 'received_gift_diy_email',
  TRACKING_EVENT_RECEIVED_GIFT: 'received_gift',
  TRACKING_EVENT_RECEIVED_GIFT_REMINDER: 'received_gift_reminder',
  TRACKING_EVENT_REDEEMED_GIFT: 'redeemed_gift',
  TRACKING_EVENT_PUT_GIFT_ON_HOLD: 'put_gift_on_hold',
  TRACKING_EVENT_SUBSCRIPTION_BILLED: 'subscription_billed',
  TRACKING_EVENT_SAVED_SHIPPING_DETAILS: 'saved_shipping_details',
  TRACKING_EVENT_UPDATED_PAYMENT_METHOD: 'updated_payment_method',
  TRACKING_EVENT_SELECTED_GIFT_OPTION: 'selected_gift_option',
  TRACKING_EVENT_VIEWED_CONTENT: 'viewed_content',
  TRACKING_EVENT_BROWSED_WINES: 'browsed_wines',
  TRACKING_EVENT_ADDED_TO_CART: 'added_to_cart',
  TRACKING_EVENT_REMOVED_FROM_CART: 'removed_from_cart',
  TRACKING_EVENT_EMPTIED_CART: 'emptied_cart',
  TRACKING_EVENT_PROCEEDED_TO_PAYMENT: 'proceeded_to_payment',
  TRACKING_EVENT_PROCEEDED_TO_PAYMENT_SPECIAL_PACK: 'proceeded_to_payment_special_pack',
  TRACKING_EVENT_STARTED_CHECKOUT: 'started_checkout',
  TRACKING_EVENT_TYPED_PAYMENT_DETAILS: 'typed_payment_details',
  TRACKING_EVENT_HAD_PAYMENT_PROBLEM: 'had_payment_problem',
  TRACKING_EVENT_RECEIVED_RECOMMENDATIONS: 'received_recommendations',
  TRACKING_EVENT_REMINDED_TO_UNPAUSE: 'reminded_to_unpause',
  TRACKING_EVENT_REMINDED_TO_UPDATE_CREDIT_CARD: 'reminded_to_update_credit_card',
  TRACKING_EVENT_SUBSCRIPTION_UNPAUSED: 'subscription_unpaused',
  TRACKING_EVENT_RATED_WINE: 'rated_wine',
  TRACKING_EVENT_WROTE_WINE_NOTES: 'wrote_wine_notes',
  TRACKING_EVENT_SUBMITTED_COMPETITION_ENTRY: 'submitted_competition_entry',
  TRACKING_EVENT_EARNED_BADGE: 'earned_badge',
  TRACKING_EVENT_REQUESTED_ADMIN_TOKEN: 'requested_admin_token',
  TRACKING_EVENT_STARTED_REFERRAL_SIGNUP: 'started_referral_signup',
  TRACKING_EVENT_RECEIVED_PROMO_NOTIFICATION: 'received_promo_notification',
  TRACKING_EVENT_RECEIVED_GENERIC_EMAIL: 'received_generic_email',
  TRACKING_EVENT_SHIPPING_LEFT_WAREHOUSE: 'shipping_left_warehouse',
  TRACKING_EVENT_SHIPPING_COMPLETED: 'shipping_completed',
  TRACKING_EVENT_SELECTED_PAYMENT_METHOD: 'selected_payment_method',
  TRACKING_EVENT_RECEIVED_FREE_BOX_INVITE: 'received_free_box_invite',
  TRACKING_EVENT_STARTED_WATCHING_VIDEO: 'started_watching_video',
  TRACKING_EVENT_COMPLETED_WATCHING_VIDEO: 'completed_watching_video',
  TRACKING_EVENT_RECEIVED_ORDER_SUGGESTION: 'received_order_suggestion',
  TRACKING_EVENT_REGISTERED_SPECIAL_PACK_INTEREST: 'registered_special_pack_interest',
  TRACKING_EVENT_REGISTERED_FREE_BOX_CAMPAIGN: 'registered_free_box_campaign',
  TRACKING_EVENT_GENERATED_FREE_BOX_PERSONAL_CODES: 'generated_free_box_personal_codes',
  TRACKING_EVENT_ADDED_AS_FRIEND: 'added_as_friend',
  TRACKING_EVENT_UPVOTED_ACTIVITY: 'upvoted_activity',
  TRACKING_EVENT_RECEIVED_COMMENT_ON_ACTIVITY: 'received_comment_on_activity',
  TRACKING_EVENT_RECEIVED_AUTO_GENERATED_ACTIVITY: 'received_auto_generated_activity',
  TRACKING_EVENT_SUBSCRIBED_TO_ONE_OFF_RECOMMENDATIONS: 'subscribed_to_one_off_recommendations',
  TRACKING_EVENT_UNSUBSCRIBED_FROM_ONE_OFF_RECOMMENDATIONS: 'unsubscribed_from_one_off_recommendations',
  TRACKING_EVENT_RECEIVED_ONE_OFF_RECOMMENDATIONS: 'received_one_off_recommendations',
  TRACKING_EVENT_RECEIVED_FREE_BOX_REJECTION: 'received_free_box_rejection',
  TRACKING_EVENT_RECEIVED_BULK_GIFTS_RECIPIENT_CONFIRMATION: 'received_bulk_gift_recipient_confirmation',
  TRACKING_EVENT_RECEIVED_YEAR_IN_REVIEW: 'received_year_in_review',
};

/**
 *  Track an event using a 3rd party library
 *  Currently using Segment.com
 * @param {string} event
 * @param {Object} data
 */
const trackEvent = (event, data) => {
  window.analytics.track(event, data);
};

/**
 *  Track Facebook Pixel Events via Segment
 *  Currently using Segment.com
 * @param {string} event
 * @param {Object} data
 */
const trackDuplicateJsEvent = (event, data) => {
  window.analytics.track(event, data, {
    integrations: {
      All: false,
      'Facebook Pixel': true,
    },
  });
};

const identifyUser = (memberId, analyticsIdentityData) => {
  window.analytics.identify(memberId, analyticsIdentityData);
};

const pageVisited = () => {
  window.analytics.page();
};

export {
  identifyUser,
  pageVisited,
  trackDuplicateJsEvent,
  trackEvent,
  trackingEvents,
};
