require('dotenv').config();  
const connectDB = require('./config/db');
const express = require("express");
const app = express();
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");


const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const morgan = require("morgan");


app.use(morgan("dev"));


connectDB();


app.use(express.json());


app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter); 


app.get('/error', (req, res, next) => {
  // إنشاء خطأ
  const error = new Error("Something went wrong!");

  next(error);
});


app.use(unknownEndpoint);


app.use(errorHandler);


const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/tours , http://localhost:${port}/api/users`);
});
