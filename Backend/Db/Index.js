import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log();

const ConnectDb = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_BASE_URI}passport-db?${process.env.MONGODB_END_URI}`
    );
    console.log("✔✔✔ MONGODB connected SUCCESSFULLY ✔✔✔");
  } catch (error) {
    console.log("🔥🔥🔥 MONGODB connection FAILED 🔥🔥🔥", error);
    process.exit(1);
  }
};

export { ConnectDb };
