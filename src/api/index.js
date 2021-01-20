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

  return fetch(url, options).then((response) => {
    if (response.ok || [401].includes(response.status)) {
      return response.json();
    }
    throw new Error(
      response.statusText || 'Algo salió mal, intente de nuevo, más tarde.',
    );
  });
}

function saveUser(user, url, method) {
  const urlencoded = new URLSearchParams();
  urlencoded.append('email', user.email);
  urlencoded.append('firstname', user.firstname);
  urlencoded.append('lastname', user.lastname);
  urlencoded.append('birthdate', user.birthdate);
  if (user.jobtitle) {
    urlencoded.append('jobtitle', user.jobtitle);
  }
  if (user.instagram) {
    urlencoded.append('instagram', user.instagram);
  }
  if (user.password) {
    urlencoded.append('password', user.password);
  }
  return callAPI(url, {
    method,
    body: urlencoded,
  });
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
    signUp(user) {
      saveUser(user, '/signup', 'POST');
    },
  },
  put: {
    users: {
      update(userId, updates) {
        saveUser(updates, `/users/${userId}`, 'PUT');
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
