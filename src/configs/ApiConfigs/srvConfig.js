import Axios from 'axios';
import { getConfig } from '../../utils.js';
import { Core } from '../endpoints';

export const srvApiConfig = Axios.create({
  baseURL:  Core.SCORE_META_API_DOMAIN,
});

srvApiConfig.interceptors.request.use(
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

