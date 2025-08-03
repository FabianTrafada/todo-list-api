import "dotenv/config";
import cors from "cors";
import express from "express";

import authRoutes from "./routers/authRoutes";
import toDoRouter from "./routers/toDoRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", toDoRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
