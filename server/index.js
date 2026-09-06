import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fs from "fs";
import userroutes from "./routes/auth.js";
import videoroutes from "./routes/video.js";
import likeroutes from "./routes/like.js";
import watchlaterroutes from "./routes/watchlater.js";
import historyrroutes from "./routes/history.js";
import commentroutes from "./routes/comment.js";
dotenv.config();
const app = express();
import path from "path";
import { fileURLToPath } from "url";

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const uploadsDirectory = path.join(serverDirectory, "uploads");
fs.mkdirSync(uploadsDirectory, { recursive: true });

app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(uploadsDirectory));
app.get("/", (req, res) => {
  res.send("You tube backend is working");
});
app.use(bodyParser.json());
app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/like", likeroutes);
app.use("/watch", watchlaterroutes);
app.use("/history", historyrroutes);
app.use("/comment", commentroutes);
const DBURL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

if (!DBURL) {
  throw new Error("DB_URL environment variable is required");
}

mongoose
  .connect(DBURL)
  .then(() => {
    console.log("Mongodb connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Mongodb connection failed:", error.message);
    process.exit(1);
  });
