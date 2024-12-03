import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { Router } from "./Routes/UserRoute.js";

const App = express();

App.use(bodyParser.json());
App.use(cors());
App.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

//test route
App.get("/", (req, res) => {
  res.send("Hello World");
});

App.use("/api", Router);
App.use("/api/cart", Router);
App.use("/api/location" , Router)
App.use("/api/payment" , Router)

App.listen(PORT, () => console.log(`Server running on port ${PORT}`));
