import React, { useContext } from "react";
import { logOut } from "../helper/apiCalls";
import MyContext from "../MyContext";

export default function Nav() {
  const {userStatus, setUserInfo,setUserStatus} = useContext(MyContext)



  const logOutUser = async () => {
    const res = await logOut();
    if (!res.error) {
      setUserInfo({});
      setUserStatus(false);
    } else {
      console.log(res.error)
    }
  };

  if (userStatus) {
    return (
        <div>
          <button onClick={logOutUser}>logOut</button>
        </div>
      );
  }  else {
      return null
  }

}
