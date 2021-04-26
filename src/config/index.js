import axios from 'axios';
import qs from 'qs';
import * as dotenv from 'dotenv';

dotenv.config();

const { REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env;
const baseURL = `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}`;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  transformRequest: [
    function (data, headers) {
      const token = localStorage.getItem('token');
      headers.Authorization = `Bearer ${token}`;
      if (data) {
        return qs.stringify(data);
      }
      return '';
    },
  ],
});

export default axiosInstance;
