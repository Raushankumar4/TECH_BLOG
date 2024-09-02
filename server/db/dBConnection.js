import mongoose from "mongoose";

const dbName = "VLOGDB";

export const dBConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB}/${dbName}`
    );
    console.log(
      `\n Mongo DB Connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("DB Cnnection Failed", error.message);
    process.exit(1);
  }
};
