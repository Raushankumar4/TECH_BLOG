import { app } from "./app.js";
import dotenv from "dotenv";
import { dBConnection } from "./db/dBConnection.js";

dotenv.config();

dBConnection()
  .then(() => {
    app.listen(process.env.PORT || 8000, (req, res) => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("DB CONNECTION FAILED", error.message);
  });
