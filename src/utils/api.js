const BASE_URL = 'http://localhost:5000';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

const callAPI = async ({ endpoint, token = '', options = {} }) => {
  await simulateNetworkLatency();

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

const api = {
  loggedIn(token) {
    return callAPI({ endpoint: '/loggedIn', token: token });
  },
  users: {
    list() {
      return callAPI({ endpoint: '/users' });
    },
    login(data) {
      return callAPI({
        endpoint: '/login',
        options: {
          method: 'POST',
          body: JSON.stringify(data)
        }
      });
    },
    create(user, token) {
      return callAPI({
        endpoint: '/signup',
        token: token,
        options: {
          method: 'POST',
          body: JSON.stringify(user),
        },
      });
    },
    findById(userId, token) {
      return callAPI({ endpoint: `/users/${userId}`, token: token });
    },
    findByEmail(email) {
      return callAPI({ endpoint: `/users/email/${email}` });
    },
    update(userId, updates, token) {
      return callAPI({
        endpoint: `/users/${userId}`,
        token: token,
        options: {
          method: 'PUT',
          body: JSON.stringify(updates),
        },
      });
    },
    remove(userId, token) {
      return callAPI({
        endpoint: `/users/${userId}`,
        token: token,
        options: {
          method: 'DELETE',
        },
      });
    },
  },
};

export default api;
