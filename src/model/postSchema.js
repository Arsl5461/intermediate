import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: String,
  caption: String,
  user_pic: String,
  title: String,
  description: String,
  date: String,
  time: String,
  duration: String,
  img: {
    type: String,
  },
  video: {
    type: String,
  },
  icon: String,

  location: String,

  like: [
    {
      status: Boolean,
      userId: String,
      profile_img: String,
    },
  ],

  comment: [
    {
      userId: String,
      profile_img: String,
      name: String,
      comment: String,
      createAt: Date,
      like: [
        {
          status: Boolean,
          userId: String,
        },
      ],
      replay: [
        {
          userId: String,
          profile_img: String,
          name: String,
          comment: String,
          createAt: Date,
        },
      ],
    },
  ],

  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
  },
});

export default mongoose.model("Post", postSchema);
