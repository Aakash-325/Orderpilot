
import "dotenv/config";
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not configured");
}

export const redis = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries >= 5) {
        return new Error("Redis reconnect limit reached");
      }

      return Math.min(retries * 500, 3000);
    },
  },
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});

redis.on("connect", () => {
  console.log("Connecting to Redis...");
});

redis.on("ready", () => {
  console.log("Redis client is ready");
});
