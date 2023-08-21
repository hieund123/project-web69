const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: "string",
      trim: true,
      unique: true,
      maxlength: 25,
      required: true,
    },
    fullname: {
      type: "string",
      trim: true,
      required: true,
      maxlength: 25,
    },
    email: {
      type: "string",
      trim: true,
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    address: {
      type: "string",
      default: "",
    },
    gender: {
      type: "string",
      default: "male",
    },
    website: {
      type: "string",
      default: "",
    },
    phone: {
      type: "string",
      default: "",
    },
    avatar: {
      type: "string",
      default: "",
    },
    story: {
      type: "string",
      default: "",
      maxlength: 200,
    },
    friends: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
