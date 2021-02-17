import credentials from '../helpers/credentials';

export const authenticateUser = async () => {
  try {
    const res = await (
      await fetch(`${credentials.serverUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // send in cookies (=> token)
      })
    ).json();

    return res;
  } catch (error) {
    return error;
  }
};

export const findMatches = async (data) => {
  try {
    const res = await (
      await fetch(`${credentials.serverUrl}/users/matches/${data}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    ).json();

    return res;
  } catch (error) {
    // catch route is NOT called on error responses from the backend
    // like 404 and 500
    console.log(error);
    return [];
  }
};

export const logOut = async (data) => {
  try {
    const res = await (
      await fetch(`${credentials.serverUrl}/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};
