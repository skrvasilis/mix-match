const url = `http://localhost:5000`; // backend base url

export const authenticateUser = async () => {
  try {
    const res = await (
      await fetch(`${url}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send in cookies (=> token)
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
      await fetch(`${url}/users/matches/${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
      await fetch(`${url}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    return res;
  } catch (error) {
    return [];
  }
};