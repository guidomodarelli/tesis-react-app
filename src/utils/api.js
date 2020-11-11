const BASE_URL = 'http://localhost:5000';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

const callAPI = async (endpoint, token, options = {}) => {
  await simulateNetworkLatency();

  console.log(options.body);

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
    return callAPI('/loggedIn', token);
  },
  users: {
    list() {
      return callAPI('/users');
    },
    create(user, token) {
      return callAPI('/signup', token, {
        method: 'POST',
        body: JSON.stringify(user),
      });
    },
    read(userId, token) {
      return callAPI(`/users/${userId}`, token);
    },
    update(userId, updates, token) {
      return callAPI(`/users/${userId}`, token, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    remove(userId, token) {
      return callAPI(`/users/${userId}`, token, {
        method: 'DELETE',
      });
    },
  },
};

export default api;
