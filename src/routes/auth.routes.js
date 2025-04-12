import express from "express";
import {
  isDelete,
  login,
  notification,
  profile,
  profileSetting,
  reg,
  userInfo,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { postComments, postEvents, postLike, postPhoto, postReplayComment, postReplayLike, postVideo } from "../controllers/user/photoPost.controller.js";

const router = express.Router();

router.post("/reg", reg);
router.post("/login", login);
router.get("/profile", isAuth, profile);
router.post("/setting", isAuth, profileSetting);
router.post("/change-password", isAuth, profileSetting);
router.post("/user-info", isAuth, userInfo);
router.post("/notification", isAuth, notification);
router.get("/accout-delete/:status", isAuth, isDelete);

// post
router.post("/photo_post", isAuth, postPhoto);
router.post("/video_post", isAuth, postVideo);
router.post("/event_post", isAuth,  postEvents);
router.put("/like_post", isAuth,  postLike);
router.put("/replay_like_post", isAuth,  postReplayLike);
router.put("/comment_post", isAuth,  postComments);
router.put("/replay_comment_post", isAuth,  postReplayComment);



export default router;
