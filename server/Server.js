import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/User.routes.js";
import authRoutes from "./routes/Auth.routes.js";
import videoRoutes from "./routes/Video.routes.js";
import commentsRoute from "./routes/Comments.user.js";
import { connectDB } from "./config/Config.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentsRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`App is listning on port ${process.env.PORT}`);
});
