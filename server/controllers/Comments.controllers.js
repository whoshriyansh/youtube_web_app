import Comment from "../models/Comment.model.js";
import { createError } from "../Error.js";

// Add Comment
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ userId: req.user.id, ...req.body });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

// Delete Comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(createError(404, "Comment not found"));
    if (comment.userId !== req.user.id)
      return next(createError(403, "You can delete only your comment"));

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("The comment has been deleted");
  } catch (err) {
    next(err);
  }
};

// Get Comments
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
