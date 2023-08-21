const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      const newUsername = username.toLowerCase().replace(/ /g, "");
      const user_name = await Users.findOne({ username: newUsername });
      if (user_name)
        return res.status(400).json({ msg: "This username already exists" });

      const Email = await Users.findOne({ email: email });
      if (Email)
        return res.status(400).json({ msg: "This email already exists" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });

      const passwordHash = await bcrypt.hash(password, 13);

      const newUser = new Users({
        fullname,
        username: newUsername,
        email,
        password: passwordHash,
        gender,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefeshToken({ id: newUser._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 24 * 30 * 60 * 60 * 1000, //30 days
      });

      await newUser.save();

      res.json({
        msg: "registed successfully",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        "friends following",
        "-password"
      );

      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "User password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefeshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 24 * 30 * 60 * 60 * 1000, //30 days
      });

      res.json({
        msg: "login successfully",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      res.json({ msg: "Logged out" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (error, result) => {
          if (error) return res.status(400).json({ msg: "Please login now" });

          const user = await Users.findById(result.id)
            .select("-password")
            .populate("friends following");

            if(!user) return res.status(400).json({ msg: "User does not exist." });

            const access_token = createAccessToken({ id: result.id });

            res.json({
                access_token,
                user
            })
        }
      );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createRefeshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = authCtrl;
