import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authActions";
import Header from "./components/Header";
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
// import PrivateRouter from "./utils/PrivateRouter";
import Profile from "./pages/Profile";

function App() {
  const { auth } = useSelector((state) => state);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Alert />
        {auth.token && <Header />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/message" element={<Messages />}></Route>
          <Route path="/explore" element={<Explore />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
