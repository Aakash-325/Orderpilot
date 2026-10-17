
import { redis } from "./config/redis.js";

async function testRedis() {
  try {
    await redis.connect();

    const result = await redis.ping();
    console.log("Redis ping:", result);

    await redis.set("orderpilot:setup-test", "connected");

    const value = await redis.get("orderpilot:setup-test");
    console.log("Redis value:", value);
  } catch (error) {
    console.error("Redis test failed:", error);
    process.exitCode = 1;
  } finally {
    if (redis.isOpen) {
      await redis.quit();
    }
  }
}

testRedis();
