import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import "../styles/ProfileInfo.css";
import EditProfile from "./EditProfile";
import GlobalFriendBtn from "./GlobalFriendBtn";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUsers } from "../redux/actions/profileActions";

const Info = (post) => {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.find(user => user._id === id);
  
      if (!newData) {
        dispatch(getProfileUsers({ users: profile.users, id, auth }));
      } else {
        setUserData([newData]);
      }
    }
  }, [id, auth.user, auth, dispatch, profile.users]);
  

  const [onEdit, SetOnEdit] = useState(false);

  return (
    <div className="profileinfo">
      {userData.length > 0 &&
        userData.map((user) => (
          <div className="profileinfo-container" key={user._id}>
            <div className="profileinfo-top">
              <img src={user.bg} alt="" />
            </div>
            <div className="profileinfo-center">
              <img
                className="profileinfo-centeravatar"
                src={user.avatar}
                alt=""
              />
              {user && auth && user?._id === auth.user._id ? (
                <button
                  className="profileinfo-centerbutton"
                  onClick={() => SetOnEdit(true)}
                >
                  EDIT PROFILE
                </button>
              ) : (
                <GlobalFriendBtn
                  classbtn="profileinfo-centerbutton"
                  user={user}
                />
              )}
            </div>
            <div className="profileinfo-bottom">
              <div className="profileinfo-bottomleft">
                <div className="profileinfo-stat">
                  <h6 className="profileinfo-statnumber">
                    {user.friends.length}
                  </h6>
                  <h6 className="profileinfo-statdesc">FRIENDS</h6>
                </div>
                <div className="profileinfo-stat">
                  <h6 className="profileinfo-statnumber">
                    {user.following.length}
                  </h6>
                  <h6 className="profileinfo-statdesc">FOLLOWING</h6>
                </div>
              </div>
              <div className="profileinfo-bottomcenter">
                <h3 className="profileinfo-fullname">{user.fullname}</h3>
                <h5 className="profileinfo-username">{user.username}</h5>
              </div>
              <div className="profileinfo-bottomright">
                <div className="profileinfo-stat">
                  <h6 className="profileinfo-statnumber">
                    {post ? post.length : 0}
                  </h6>
                  <h6 className="profileinfo-statdesc">POSTS</h6>
                </div>
              </div>
            </div>
            {onEdit && <EditProfile user={user} SetOnEdit={SetOnEdit} />}
          </div>
        ))}
    </div>
  );
};

export default Info;
