import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function MyMatch() {
  const { sortedMatches, userInfo, avatarUrl } = useContext(MyContext);
  const [loader, setLoader] = useState(false);
  console.log(sortedMatches)

  setTimeout(function () {
    setLoader(true);
  }, 200);

  if (loader === false) {
    return (
      <div className="main">
        <div className="content">
          <section>
            <Loader
              type="Oval"
              color="#ff00ff"
              height={100}
              width={100}
              timeout={300}
            />
          </section>
        </div>
      </div>
    );
  } else {
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
                        <img
                          className="avatar"
                          src={item.avatar}
                          alt="avatar"
                        />
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
}
