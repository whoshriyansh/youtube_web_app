import express from "express";
import {
  dislike,
  getUser,
  like,
  removeUser,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/User.controllers.js";
import { verifyToken } from "../VerifyToken.js";

const router = express.Router();

// Update User
router.put("/:id", verifyToken, updateUser);

// Delete User
router.delete("/:id", verifyToken, removeUser);

// Get a User
router.get("/find/:id", getUser);

// Subscribe a User
router.put("/sub/:id", verifyToken, subscribe);

// Unsubscribe a User
router.put("/unsub/:id", verifyToken, unsubscribe);

// Like a Video
router.put("/like/:videoId", verifyToken, like);

// Dislike a Video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
