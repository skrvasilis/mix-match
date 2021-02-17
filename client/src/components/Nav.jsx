import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { logOut } from '../helpers/apiCalls';
import MyContext from '../MyContext';

export default function Nav() {
  const { userStatus, setUserInfo, setUserStatus } = useContext(MyContext);

  const history = useHistory();

  const logOutUser = async () => {
    const res = await logOut();
    if (!res.error) {
      setUserInfo({});
      setUserStatus(false);
      history.push('/');
    } else {
      console.log(res.error);
    }
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
