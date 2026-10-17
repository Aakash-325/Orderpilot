
import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { sql } from "./db/index.js";
import { redis } from "./config/redis.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the OrderPilot API!");
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "healthy",
    application: "OrderPilot API",
    timestamp: new Date().toISOString(),
  });
});

async function closeConnections() {
  await Promise.allSettled([sql.end(), redis.quit()]);
  console.log("Database and Redis connections closed");
}

async function startServer() {
  try {
    // Verify PostgreSQL connectivity.
    await sql`SELECT 1`;
    console.log("PostgreSQL connected successfully");

    // Verify Redis connectivity.
    await redis.connect();
    await redis.ping();
    console.log("Redis connected successfully");

    const server = app.listen(config.port, () => {
      console.log(`OrderPilot API running on port ${config.port}`);
    });

    async function shutdown(signal: string) {
      console.log(`${signal} received. Shutting down...`);

      server.close(async (error) => {
        if (error) {
          console.error("HTTP server shutdown error:", error);
          process.exitCode = 1;
        }

        await closeConnections();

        if (!error) {
          process.exitCode = 0;
        }
      });
    }

    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
  } catch (error) {
    console.error("Application startup failed:", error);

    await closeConnections();
    process.exitCode = 1;
  }
}

void startServer();
