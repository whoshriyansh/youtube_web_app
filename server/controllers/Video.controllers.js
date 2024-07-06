import User from "../models/User.model.js";
import Video from "../models/Video.model.js";
import { createError } from "../Error.js";

// Add Video
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

// Update Video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not found"));
    if (video.userId !== req.user.id)
      return next(createError(403, "You can update only your video"));

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (err) {
    next(err);
  }
};

// Delete Video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not found"));
    if (video.userId !== req.user.id)
      return next(createError(403, "You can delete only your video"));

    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("The video has been deleted");
  } catch (err) {
    next(err);
  }
};

// Get Video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not found"));
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// Get Random Videos
export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Get Trending Videos
export const trendVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ videoViews: -1 }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Get Subscribed Channel Videos
export const subVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

// Get Videos by Tags
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  // console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Get Videos by Search
export const getBySearch = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
