import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.DB_ONLINE!)
    .then(() => console.log("database connection"))
    .catch((err) => console.log("error connecting"));
};
