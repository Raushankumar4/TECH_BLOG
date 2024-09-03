import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTENTED_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// routes

import userRoute from "./routers/user.routes.js";
import vlogRoute from "./routers/vlog.routes.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/vlog", vlogRoute);

// getting app
app.get("/", (req, res) => {
  res.json({ message: "Server Is listening" });
});

export { app };
