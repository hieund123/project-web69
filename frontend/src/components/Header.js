import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExploreIcon from "@mui/icons-material/Explore";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "../styles/Header.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataApi } from "../utils/fetchDataApi";
import { logout } from "../redux/actions/authActions";
import UserCard from "./UserCard";

const Header = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const { auth, notify } = useSelector((state) => state);
  const { pathname } = useLocation();

  useEffect(() => {
    if (search && auth.token) {
      getDataApi(`search?username=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: "ALERT",
            payload: {
              error: err.response.data.msg,
            },
          });
        });
    } else {
      setUsers([]);
    }
  }, [search, auth.token, dispatch]);

  // const isActive = (pn) => {
  //   console.log(pn);
  //   if (pn === pathname) return true;
  // };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

  return (
    <div className="header">
      <div className="header-right">
        <h3>Social Network</h3>
      </div>
      <form className="header-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Profiles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon style={{ opacity: users.length > 0 ? "0" : "1" }} />
        <span
          className="header-centersearchclose"
          onClick={handleClose}
          style={{ opacity: users.length > 0 ? "1" : "0" }}
        >
          &times;
        </span>
        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
        <div className="header-searchusers">
          {load && (
            <img src={""} alt="" style={{ width: "48px", height: "48px" }} />
          )}
          {search &&
            users.length > 0 &&
            users.map((user, index) => (
              <UserCard
                key={index}
                user={user}
                handleClose={handleClose}
              />
            ))}
        </div>
      </form>
      <div className="header-left ">
        <Link to={`/profile/${auth.user._id}`}>
          {" "}
          <div className="header-leftAvatar">
            <PersonIcon src={auth.user.avatar} />
            <h4 style={{ color: "white" }}>{auth.user.fullname}</h4>
          </div>
        </Link>

        <Link to="/">
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>

        <Link to="/message">
          <IconButton>
            <MessageIcon />
          </IconButton>
        </Link>
        <Link to="/notification">
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <span
            style={{
              position: "absolute",
              transform: "translate(-26px,16px)",
              color: "white",
              fontSize: "10px",
            }}
          >
            {notify && notify.data.length}
          </span>
        </Link>
        <Link to="/explore">
          <IconButton>
            <ExploreIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => dispatch(logout())}>
          <ExitToAppIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
