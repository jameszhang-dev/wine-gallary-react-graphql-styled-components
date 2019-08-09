import { AU_STATES } from './constants';

/**
 * Group of functions used for validating forms in the front end
 * */

// TODO: DEV-144 to improve the validation text for all the methods

/**
 * Simple check against min length of a string.
 *
 * @param value: string to be tested
 * @param min: integer with min length of the string
 * @return {string|null}
 * */
const checkMinLength = (value, min) => {
  if (typeof value === 'undefined' || value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return null;
};
const checkName = value => checkMinLength(value, 2);
const checkAddress = value => checkMinLength(value, 2);

/**
 * Check if chosen state is within map AU_STATES from file ./constants.js
 *
 * @param value: string from input field
 * @return {string|null}: error message
 * */
const checkState = value => {
  const isState = AU_STATES.has(value.toUpperCase());
  if (!isState) {
    return 'Must be the shortening version of an Australian state';
  }
  return null;
};

/**
 * Check strength of password. Strength can be verified -->
 * https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
 *
 * @param value
 * @return {string|null}
 * */
const checkPassword = value => {
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  const mediumRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
  );

  if (!value || strongRegex.test(value)) return null;
  if (mediumRegex.test(value)) return 'Yes good to go, password good enough (but could be better).';

  return (
    `Sorry, your password is too weak try to add at least one capital letter, 
     one alphanumeric character, and need a minimum length of 6 characters`
  );
};

/**
 * Validates string to check if it is an email, followed website below:
 * https://emailregex.com/
 *
 * @param value: value of input field
 * @return {string|null}: error message
 * */
const checkEmail = value => {
  const regexString = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1'
    + ',3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  const emailRegex = new RegExp(regexString);

  if (emailRegex.test(value)) return null;
  return 'Sorry it doesn\'t look like an email.';
};

/**
 * Gets response from mutation and in case of error, it gets the error message by the field name and returns
 * an array with the error messages
 *
 * @param data: response from server
 * @param field: name from the field from database
 * @param payload: name of the payload returned from mutation
 * @return {Array}: array of error messages for that field
 * */
const checkServerValidation = (data, payload, field) => {
  const errorMessages = data && data[payload] && data[payload].errors;
  let messagesArray = [];

  if (errorMessages) {
    errorMessages.forEach(error => {
      if (error.field === field) {
        messagesArray = messagesArray.concat(error.messages);
        console.log(messagesArray, field);
      }
    });
  }
  return messagesArray;
};

export {
  checkEmail,
  checkMinLength,
  checkName,
  checkPassword,
  checkAddress,
  checkState,
  checkServerValidation,
};
