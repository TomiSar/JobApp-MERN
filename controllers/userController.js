import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

// GET ALL USERS
// @desc   Fetch current user
// @route  GET /api/v1/users/current-user
// @access Public
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

// UPDATE USER
// @desc   Update User
// @route  PATCH /api/v1/users/update-user
// @access Public
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  console.log(obj);
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'user updated', updatedUser });
};

// GET APPLICATION STATS
// @desc   Fetch application stats
// @route  GET /api/v1/users/admin/app-stats
// @access Public
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};
