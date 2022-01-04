import Axios from 'axios';
import { getConfig } from '../../utils.js';
import { Core } from '../endpoints';

export const previousYearApiConfig = Axios.create({
  baseURL:  Core.PREVIOUS_YEAR_API_DOMAIN,
});

previousYearApiConfig.interceptors.request.use(
  function(config) {
    const configs = getConfig('config');
    if (configs)  {
      config.headers["Authorization"] = configs.token;
      config.headers["useridentity"] = configs.uid;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

