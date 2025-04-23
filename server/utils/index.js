import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Database connected");

    const db = mongoose.connection;

    db.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err.message);
    });

    db.on("disconnected", () => {
      console.warn("⚠️ Mongoose disconnected");
    });

    process.on("SIGINT", async () => {
      await db.close();
      console.log("🔌 Mongoose connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Initial DB connection failed:", error.message || error);
    process.exit(1);
  }
};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // Change sameSite from strict to none when you deploy your app
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "lax", // "none" for cross-site requests but requires HTTPS
  //   maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  //   // maxAge: 30 * 1000, //1 day
  // });

  // For the Production Level Config
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
};
