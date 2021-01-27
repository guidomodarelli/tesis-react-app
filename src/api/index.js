const BASE_URL = 'http://localhost:5000';

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const randomNumber = (min = 0, max = 1) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
// const simulateNetworkLatency = (min = 30, max = 1500) => {
//   return delay(randomNumber(min, max));
// };

async function callAPI(endpoint, options = {}) {
  // await simulateNetworkLatency();

  const token = localStorage.getItem('token');

  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  const url = BASE_URL + endpoint;

  const response = await fetch(url, options);
  if (response.ok || [401].includes(response.status)) {
    return response.json();
  }
  throw new Error(
    response.statusText || 'Algo salió mal, intente de nuevo, más tarde.',
  );
}

function saveUser(user, url, method) {
  const urlencoded = new URLSearchParams();
  const entries = Object.entries(user);
  let hasValue = false;
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    if (value) {
      hasValue = true;
      urlencoded.append(key, value);
    }
  }
  return hasValue ?
    callAPI(url, {
      method,
      body: urlencoded,
    }) :
    Promise.resolve();
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
      isMyProfile(userId) {
        return callAPI(`/users/myProfile/${userId}`);
      },
      myProfile() {
        return callAPI('/users/profile');
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
    async signUp(user) {
      await saveUser(user, '/signup', 'POST');
    },
  },
  put: {
    users: {
      async update(userId, updates) {
        await saveUser(updates, `/users/${userId}`, 'PUT');
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
