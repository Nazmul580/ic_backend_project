const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const rootRouter = require("./routers/rootRouter");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
require("dotenv").config();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigin = process.env.FRONTEND_URL;

      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("acces denied"), false);
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

rootRouter(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
