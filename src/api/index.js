const BASE_URL = 'http://localhost:5000';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const simulateNetworkLatency = (min = 30, max = 1500) => {
  return delay(randomNumber(min, max));
};

async function callAPI(endpoint, options = {}) {
  await simulateNetworkLatency();

  const token = localStorage.getItem('token');

  const init = {
    ...options,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  };
  if (token) {
    init.headers.Authorization = `Bearer ${token}`;
  }
  const url = BASE_URL + endpoint;

  return fetch(url, init)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText || 'Algo salió mal, intente de nuevo, más tarde.');
    })
    .then((data) => {
      if (!data) {
        throw new Error(
          'Ocurrió un problema con el servidor, no se pudo establecer conexión',
        );
      }
      return data;
    })
    .catch(console.error);
}

const api = {
  get: {
    loggedIn() {
      return callAPI('/loggedIn');
    },
    users: {
      list() {
        return callAPI('/users');
      },
      myProfile(userId) {
        return callAPI(`/users/myProfile/${userId}`);
      },
      findById(userId) {
        return callAPI(`/users/${userId}`);
      },
      findByEmail(email) {
        return callAPI(`/users/email/${email}`);
      },
    },
  },
  post: {
    signIn(user) {
      const urlencoded = new URLSearchParams();
      urlencoded.append('email', user.email);
      urlencoded.append('password', user.password);

      return callAPI('/login', {
        method: 'POST',
        body: urlencoded,
      });
    },
    signUp(user) {
      const urlencoded = new URLSearchParams();
      urlencoded.append('email', user.email);
      urlencoded.append('firstname', user.firstname);
      urlencoded.append('lastname', user.lastname);
      urlencoded.append('birthdate', user.birthdate);
      urlencoded.append('jobtitle', user.jobtitle);
      urlencoded.append('instagram', user.instagram);
      urlencoded.append('password', user.password);

      return callAPI('/signup', {
        method: 'POST',
        body: urlencoded,
      });
    },
  },
  put: {
    users: {
      update(userId, updates) {
        const urlencoded = new URLSearchParams();
        const entries = Object.entries(updates);
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const key = entry[0];
          const value = entry[1];
          urlencoded.append(key, value);
        }
        return callAPI(`/users/${userId}`, {
          method: 'PUT',
          body: urlencoded,
        });
      },
    },
  },
  delete: {
    users: {
      remove(userId) {
        return callAPI(`/users/${userId}`, {
          method: 'DELETE',
        });
      },
    },
  },
};

export default api;
