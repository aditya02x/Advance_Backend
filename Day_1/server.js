import dotenv from "dotenv";
dotenv.config();

import redisClient from "./src/config/redis.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await redisClient.connect();
    console.log("Connected to Redis successfully");

    // Store value for 10 seconds
    await redisClient.set("name", "Aditya", {
      EX: 10,
    });

    console.log("Value stored in Redis");

    // Check value after 12 seconds
    setTimeout(async () => {
      const value = await redisClient.get("name");
      console.log("Value from Redis after 12 sec:", value);
    }, 12000);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Error starting server:", error);
  }
};

startServer();