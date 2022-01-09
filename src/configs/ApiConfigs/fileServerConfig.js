import Axios from 'axios';
import { Core } from '../endpoints';

export const fileServerConfig  = Axios.create({
  baseURL:  Core.FILE_SERVER_API_DOMAIN,
});

