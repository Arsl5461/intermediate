import Users from "../../model/userSchema.js";
import Posts from "../../model/postSchema.js";

export const postPhoto = async (req, res) => {
  try {
    const { _id } = req.user;

    const { caption, description } = req.body;

    if (!caption || !description) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await Users.findById(_id);

    const post = new Posts({
      userId: user._id,
      user_pic: user.profile_pic,
      img: req.file.path,
      caption,
      description,
    });

    await post.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const postVideo = async (req, res) => {
  try {
    const { _id } = req.user;

    const { caption, description } = req.body;

    if (!caption || !description) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await Users.findById(_id);

    const post = new Posts({
      userId: user._id,
      user_pic: user.profile_pic,
      video: req.file.path,
      caption,
      description,
    });

    await post.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const postEvents = async (req, res) => {
  try {
    const { _id } = req.user;

    const { title, description, date, time, duration, location, guests } =
      req.body;

    if (req.file.pathn) {
      return res
        .status(400)
        .json({ status: false, message: "choose image first" });
    }

    if (!description || !date || !time || !duration || !location) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const user = await Users.findById(_id);

    const post = new Posts({
      userId: user._id,
      user_pic: user.profile_pic,
      img: req.file.path,
      title,
      description,
      date,
      time,
      duration,
      location,
      guests,
      story: true,
    });

    await post.save();

    res.status(201).json({ message: " created Event successfully" });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const postLike = async (req, res) => {
  try {
    const { _id } = req.user;

    const { postId, status } = req.body;

    if (!postId) {
      return res
        .status(200)
        .json({ status: false, message: "post id not found" });
    }

    const post = await Posts.findById(postId);
    const user = await Users.findById(_id);

    post.like.push({
      userId: user._id,
      profile_img: user.profile_pic,
      status: status,
    });

    await post.save();

    res.status(201).json({
      status: true,
      message: status ? "user liked post " : "user unlike post ",
    });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const postReplayLike = async (req, res) => {
  try {
    const { _id } = req.user;

    const { postId, status, replayId } = req.body;

    if (!postId) {
      return res
        .status(200)
        .json({ status: false, message: "post id not found" });
    }

    const post = await Posts.findById(postId);
    const user = await Users.findById(_id);

    const replayLike = post.comment.filter((item) => {
      return item.userId == replayId;
    });

    replayLike.like.push({
      userId: user._id,
      status: status,
    });

    await post.save();

    res.status(201).json({
      status: true,
      message: status ? "user liked post " : "user unlike post ",
    });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const postComments = async (req, res) => {
  try {
    const { _id } = req.user;

    const { postId, comment } = req.body;

    if (!postId) {
      return res
        .status(200)
        .json({ status: false, message: "post id not found" });
    }

    const post = await Posts.findById(postId);
    const user = await Users.findById(_id);

    post.comment.push({
      userId: user._id,
      profile_img: user.profile_pic,
      comment: comment,
      name: user.name,
      createAt: new Date(),
    });

    await post.save();

    res.status(201).json({
      status: true,
      message: "user Comments your post ",
    });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const postReplayComment = async (req, res) => {
  try {
    const { _id } = req.user;

    const { postId, comment, replayId } = req.body;

    if (!postId) {
      return res
        .status(200)
        .json({ status: false, message: "post id not found" });
    }

    const post = await Posts.findById(postId);

    const user = await Users.findById(_id);

    const replayPost = post.comment.filter((item) => {
      return item.userId == replayId;
    });

    replayPost.replay.push({
      userId: user._id,
      profile_img: user.profile_pic,
      comment: comment,
      name: user.name,
      createAt: new Date(),
    });

    await post.save();

    res.status(201).json({
      status: true,
      message: "user replay your Comments ",
    });
  } catch (error) {
    res.json({ error, status: false });
  }
};
