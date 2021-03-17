import axios from 'axios';
import qs from 'qs';

const baseURL = 'http://localhost:5000';

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
