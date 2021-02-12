import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyContext from "../MyContext";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function MyMatchSingle() {
  const { userInfo, sortedMatches, avatarUrl } = useContext(MyContext);
  let { id } = useParams();

  const [selectedUser, setSelectedUser] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const myUser =
      sortedMatches &&
      sortedMatches.find((item) => {
        return item._id === id;
      });
    setSelectedUser(myUser);
  }, [sortedMatches]);

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
          <h1>You and {selectedUser && selectedUser.userName}</h1>

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

          {selectedUser && selectedUser.avatar === null ? (
            <object
              alt="avatar-placeholder"
              type="image/svg+xml"
              data={avatarUrl}
              className="avatar"
            ></object>
          ) : (
            <img
              className="avatar"
              src={selectedUser && selectedUser.avatar}
              alt="avatar"
            />
          )}
          {selectedUser && selectedUser.commonArtists.lenght === 0 ? (
            <h3>Sorry you don't have any Artist matching</h3>
          ) : (
            <ul className="results">
              <h3>The same artists you both like</h3>

              {selectedUser &&
                selectedUser.commonArtists.map((item) => {
                  return (
                    <li className="result">
                      <h4>{item.artistName}</h4>
                      <img
                        className="list-avatar"
                        src={item.artistAvatar}
                        alt="avatar"
                      />
                    </li>
                  );
                })}
            </ul>
          )}

          {selectedUser && selectedUser.commonGenres.lenght === 0 ? (
            <h3>Sorry you don't have any Gernres matching</h3>
          ) : (
            <ul className="results">
              <h3>The top genres you both like</h3>
              {selectedUser &&
                selectedUser.commonGenres.map((item) => {
                  return (
                    <li className="result">
                      <h4>{item.genre}</h4>
                    </li>
                  );
                })}
            </ul>
          )}
          <a href={selectedUser && selectedUser.userLink}>
            <button type="button">
              Click here to to visit {selectedUser && selectedUser.userName}{" "}
              Spotify page
            </button>
          </a>
        </div>
      </div>
    );
  }
}
