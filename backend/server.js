require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


// routes

app.use('/api', authRouter)
app.use('/api', userRouter);



const URL = process.env.MONGO_URI;

(async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('db is connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
