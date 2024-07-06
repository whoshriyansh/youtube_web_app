import express from "express";
import {
  addVideo,
  deleteVideo,
  updateVideo,
  getVideo,
  randomVideos,
  trendVideos,
  subVideos,
  getByTag,
  getBySearch,
} from "../controllers/Video.controllers.js";
import { verifyToken } from "../VerifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.get("/trend", trendVideos);
router.get("/random", randomVideos);
router.get("/sub", verifyToken, subVideos);
router.get("/tags", getByTag);
router.get("/search", getBySearch);

export default router;
