import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "../helpers/apiCalls";
import MyContext from "../MyContext";

export default function Nav() {
  const { userStatus, setUserInfo, setUserStatus } = useContext(MyContext);

  const history = useHistory();

  const logOutUser = async () => {
    setUserInfo({});
    setUserStatus(false);
    localStorage.removeItem("token");

    history.push("/");
  };

  if (userStatus) {
    return (
      <div>
        <button onClick={logOutUser}>logOut</button>
      </div>
    );
  } else {
    return null;
  }
}
