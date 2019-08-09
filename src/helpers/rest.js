import axios from 'axios';
import { EMPTY_PARAM_DATA } from './constants';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_REST_DOMAIN}`,
  timeout: 3600,
});

/**
 * Executes ajax call using axios instance
 *
 * @param httpMethod
 * @param urlPath
 * @param data
 * @return {Promise<any>}
 * */
const executeRestApi = (
  httpMethod, urlPath, { data = null } = EMPTY_PARAM_DATA
) => new Promise((resolve, reject) => instance({ method: httpMethod, url: urlPath, data })
  .then(result => {
    resolve(result);
  })
  .catch(error => {
    console.error(error);
    reject(error);
  }));

export default executeRestApi;
