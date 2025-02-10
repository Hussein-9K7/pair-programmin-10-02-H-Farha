const express = require("express");
const app = express();
const connectDB = require("./config/db");
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint } = require("./middleware/customMiddleware");
connectDB()
const morgan = require("morgan");
app.use(morgan("dev"));

// Middleware to parse JSON
app.use(express.json());
 
// Use the tourRouter for all "/tours" routes
app.use("/api/tours", tourRouter);

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
// app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`http://localhost:${port}/api/tours , http://localhost:${port}/api/users `);
});
 