// Standard Library Imports
import express from "express";
import bodyParser from "body-parser";

// Third-party Library Imports
import cors from "cors";
import dotenv from "dotenv";

// Your Own Module Imports
import DBconnection from "./dataBase/db.js";
import authRoute from "./router/authRoute.js";
import bookRoute from "./router/bookRoute.js";
import logger from "morgan";

dotenv.config();

const app = express();
// app.use(cors({ origin: "*", credentials: true }));
app.use(cors())
app.use(express.json({ limit: "20mb" }));
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

DBconnection();

app.use("/auth", authRoute);
app.use("/book", bookRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
