import mongoose from "mongoose";

export const database = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("database connection sucessfuly", connection.host);
  } catch (error) {
    console.log(error.message);
  }
};
