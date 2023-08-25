const valid = ({ username, fullname, email, password, confirmPassword }) => {
  const err = {};

  if (!fullname) {
    err.fullname = "Please enter your full name";
  } else if (fullname.length > 25) {
    err.fullname = "Full name must be less than 25 characters";
  }

  if (!username) {
    err.username = "Please enter your username";
  } else if (username.replace(/ /g, "").length > 25) {
    err.username = "Username must be less than 25 characters";
  }

  if (!email) {
    err.email = "Please enter your email";
  } else if (!validateEmail(email)) {
    err.email = "Invalid email address";
  }

  if (!password) {
    err.password = "Please enter your password";
  } else if (password.length < 6) {
    err.password = "Password must be at least 6 characters";
  }

  if(!confirmPassword) {
    err.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    err.confirmPassword = "Confirm password must match your password";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
}

export default valid;
