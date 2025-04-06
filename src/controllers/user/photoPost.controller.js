import Users from "../../model/userSchema";
import Posts from "../../model/postSchema";

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
