import jwt from 'jsonwebtoken';
import { HTTP_METHODS } from './constants';
import executeRestApi from './rest';
import { shoppingCartLocalStorage } from './tools';

const localStorageContent = localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);

/**
 * Gets auth information to browser local storage and decodes information
 * @return {Object}
 * */
const getLocalStorageToken = () => {

  // Creates token object with null properties in case of error or `localStorage` is undefined
  const tokenObjectNull = { accessToken: null, refreshToken: null, email: null };

  let tokenObject = jwt.verify(
    localStorageContent, process.env.REACT_APP_AUTH_DECODE, (error, decode) => {
      try {
        return decode;
      } catch (e) {

        // Logs error
        error && console.error('error', error);
        e && console.error('e', e);
        return tokenObjectNull;
      }
    }
  );

  // Assigns token object with null properties in case it is `undefined`
  if (!tokenObject) tokenObject = tokenObjectNull;

  return tokenObject;
};

/**
 * Sets encoded auth information to browser local storage
 * @param {string} accessToken
 * @param {string} refreshToken
 * @param {string} email
 * */
const setLocalStorageToken = (accessToken, refreshToken, email) => {
  localStorage.setItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE, jwt.sign(
    {
      accessToken,
      refreshToken,
      email,
    },
    `${process.env.REACT_APP_AUTH_DECODE}`
  ));
};

/**
 * Checks if the browser has session stored in local storage
 * @return {boolean}
 * */
const isLoggedIn = () => {

  // TODO: add a check to expired tokens
  const localStorageTokenObject = getLocalStorageToken();
  return Boolean(localStorageContent && localStorageTokenObject);
};

/**
 * Executes Login api request and save token details
 * @param {string} email
 * @param {string} password
 * @return {Promise<void>}
 * */
const executeLogInRequest = async (email, password) => {

  // Creates arguments to pass into Login API request
  const urlPath = `${process.env.REACT_APP_REST_AUTH_PATH}`;
  const data = {
    password,
    username: email,
    grant_type: 'password',
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
  };

  // Logs user in, if sign up is successful
  return executeRestApi(HTTP_METHODS.POST, urlPath, { data })

  // Stores response from request in local storage and redirects to my account page
    .then(response => {

      // Encodes and Stores tokens in localStorage --> https://www.npmjs.com/package/jsonwebtoken
      setLocalStorageToken(
        response.data.access_token,
        response.data.refresh_token,
        email
      );
      return response;
    });
};

/**
 * Sends sign up request to GraphQL mutation and log results in the browser
 * On successful sign up it saves local storage shopping cart item to database
 * @param {Object} form
 * @param {Function} signUp
 * @param {Function} addShoppingCart
 * @return {Promise<void>} response object built with responses from all promises.
 * */
const executeSignUpRequest = async (form, signUp, addShoppingCart) => {
  const response = {};
  const shoppingCart = shoppingCartLocalStorage();

  // Creates an array (signUpInput) removing unnecessary info
  const { __typename, confirmPassword, ...signUpInput } = form;

  // Builds input depending on which page the user is accessing
  const input = { ...signUpInput, hasUpdatedPassword: true };

  if (confirmPassword === signUpInput.password) {

    // Saves new member (signUp)
    await signUp({ variables: { input } })
      .then(member => {
        response.member = member;
      });

    // Only executes login in case SignUp mutation returns no error
    if (!response.member.data.signUp.errors) {

      if (shoppingCart) {

        // Creates shopping cart in database with local storage item
        shoppingCart.items.length
        && await shoppingCart.items.map(item => addShoppingCart({
          variables: {
            input: {
              memberId: response.member.data.signUp.id,
              productId: item.product.id,
              quantity: item.quantity,
            },
          },
        }).then(

          // Deletes shopping cart from local storage
          window.localStorage.removeItem('shoppingCart')
        ));
      }

      // Executes Login and redirects user to MyAccount page
      await executeLogInRequest(form.email, form.password)

      // Catches error from server (if login unsuccessful) and show message in the form
        .catch(error => {

          // Stores error from server's response in state variables
          response.form = {
            ...form,
            error: [error.response.data.error_description],
          };
        });
    }

  } else {
    response.errors = ['Sorry, your passwords do not match.'];
  }
  return response;
};

export {
  executeLogInRequest,
  executeSignUpRequest,
  getLocalStorageToken,
  setLocalStorageToken,
  isLoggedIn,
};
