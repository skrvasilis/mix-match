import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

export default function MyMatch() {
  const { sortedMatches, userInfo, avatarUrl } = useContext(MyContext);


  return (
    <div className="main">
      <div className="content">
        <h1>{`Top 5 matches of ${userInfo && userInfo.userName}`}</h1>
        {userInfo && userInfo.avatar === null ? (
          <object
            alt="avatar-placeholder"
            type="image/svg+xml"
            data={avatarUrl}
            className="avatar"
          ></object>
        ) : (
          <img
            className="avatar"
            src={userInfo && userInfo.avatar}
            alt="avatar"
          />
        )}
        <ul className="results">
         
          {sortedMatches &&
            sortedMatches.map((item) => {
              return (
                <li className="result">
                  <Link className="list-link" to={`/mymatch/${item._id}`}>
                    <h4>{item.userName}</h4>

                    {item.avatar === null ? (
                      <object
                        alt="avatar-placeholder"
                        type="image/svg+xml"
                        data={avatarUrl}
                        className="avatar"
                      ></object>
                    ) : (
                      <img className="avatar" src={item.avatar} alt="avatar" />
                    )}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
