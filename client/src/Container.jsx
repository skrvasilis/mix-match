import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import { authenticateUser, findMatches } from './helpers/apiCalls';
import avatarPlaceholder from './assets/avatarUrl.svg';

export default function Container(props) {
  const [userStatus, setUserStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [sortedMatches, setSortedMatches] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState();
  const [avatarUrl, setAvatarUrl] = useState(avatarPlaceholder);

  useEffect(() => {
    //Authenticate our cookie sir
    (async function () {
      const user = await authenticateUser();

      // still logged in?
      if (!user.error) {
        setUserInfo(user);
        setUserStatus(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (userInfo._id) {
      (async function () {
        const res = await findMatches(userInfo._id);

        if (res.length > 0) {
          const similarusers = res.filter((item) => {
            return item.userName !== userInfo.userName;
          });
          setMatchedUsers(similarusers);
        }
      })();
    }
  }, [userInfo]);

  useEffect(() => {
    const sortedUsers =
      matchedUsers &&
      matchedUsers.slice(0, 10).sort((a, b) => {
        return b.commonGenres.length - a.commonGenres.length;
      });
    setSortedMatches(sortedUsers);
  }, matchedUsers);

  return (
    <MyContext.Provider
      value={{
        userInfo,
        setMatchedUsers,
        sortedMatches,
        avatarUrl,
        userStatus,
        setUserInfo,
        setUserStatus,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
