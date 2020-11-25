const BASE_URL = 'http://localhost:5000';

let mySignal;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callAPI(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  options.signal = mySignal;

  const url = BASE_URL + endpoint;

  try {
    return await fetch(url, options);
  } catch (error) {
    console.error(error);
  }
}

const api = (signal) => {
  mySignal = signal;
  return {
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
      login(user) {
        const urlencoded = new URLSearchParams();
        urlencoded.append('email', user.email);
        urlencoded.append('password', user.password);

        return callAPI('/login', {
          method: 'POST',
          body: urlencoded,
        });
      },
      create(user) {
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
      findById(userId) {
        return callAPI(`/users/${userId}`);
      },
      findByEmail(email) {
        return callAPI(`/users/email/${email}`);
      },
      update(userId, updates) {
        const urlencoded = new URLSearchParams();
        for (const [key, value] of Object.entries(updates)) {
          urlencoded.append(key, value);
        }
        return callAPI(`/users/${userId}`, {
          method: 'PUT',
          body: urlencoded,
        });
      },
      remove(userId) {
        return callAPI(`/users/${userId}`, {
          method: 'DELETE',
        });
      },
    },
  };
};

export default api;
