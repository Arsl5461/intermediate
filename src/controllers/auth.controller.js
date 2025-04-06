import Users from "../model/userSchema.js";
import Notifications from "../model/notification.js";

export const reg = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ status: false, msg: "Please fill in all fields" });
    }

    const user = await Users.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const newUser = new Users({
      name,
      email,
      password,
      role,
      createdAt: new Date(),
    });

    const userId = await newUser.save();

    const notification = new Notifications({
      userId: userId._id,
    });

    await notification.save();

    res
      .status(200)
      .json({ status: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(200)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ status: false, message: "User not exist" });
    }

    if (user.isDelete == true && user.createAt < Date.now()) {
      return res
        .status(400)
        .json({ status: false, message: "User is deleted" });
    }

    if (user.isDelete == true) {
      user.isDelete = false;
      await user.save();
    }

    const token = user.getAuthToken();

    res
      .status(200)
      .json({ status: true, message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ status: false, message: "User not exist" });
    }

    res.json({ status: true, user: user });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const profileSetting = async (req, res) => {
  try {
    const { name, last_name, username, phone, gender, dob, address } = req.body;

    const user = await Users.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ status: false, message: "User not exist" });
    }

    const data = {
      name,
      last_name,
      username,
      phone,
      gender,
      dob,
      address,
    };

    const update = await Users.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });

    res.json({
      status: true,
      user: update,
      message: "User profile updated successfully",
    });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Users.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ status: false, message: "User not exist" });
    }

    if (user.password !== oldPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Old password is incorrect" });
    }

    const data = {
      password: newPassword,
    };

    const update = await Users.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });

    res.json({
      status: true,
      user: update,
      message: "User profile updated successfully",
    });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const userInfo = async (req, res) => {
  try {
    const { education, experience, skills } = req.body;

    const user = await Users.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ status: false, message: "User not exist" });
    }

    user.education.push(education);
    user.experience.push(experience);
    user.skills.push(skills);

    await user.save();

    res.json({
      status: true,
      user: user,
      message: "User skills updated successfully",
    });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const notification = async (req, res) => {
  try {
    const { _id } = req.user;
    const { notification } = req.body;

    const noti = await Notifications.findOne({ userId: _id });

    await Notifications.findByIdAndUpdate(noti._id, notification, {
      new: true,
    });

    res.json({ status: true, message: "Notification updated successfully" });
  } catch (error) {
    res.json({ error, status: false });
  }
};

export const isDelete = async (req, res) => {
  try {
    const { _id } = req.user;
    const { status } = req.params;

    const user = await Users.findById(_id);

    if (!status) {
      return res.json({ status: false, message: "User is not delete" });
    }
    user.isDelete = true;
    user.updateAt = new Date();

    await user.save();

    res.json({ status: true, message: "User account deleted successfully" });
  } catch (error) {
    res.json({ error, status: false });
  }
};
