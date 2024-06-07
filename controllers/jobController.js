import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

// GET ALL JOBS
// @desc   Fetch all jobs
// @route  GET /api/v1/jobs
// @access Public
export const getJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

// GET SINGLE JOB
// @desc   Fetch all jobs
// @route  GET /api/v1/jobs/:id
// @access Public
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

// CREATE JOB
// @desc   Create job
// @route  POST /api/v1/jobs
// @access Public
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'Job created', job });
};

// EDIT JOB
// @desc   Update job
// @route  PATCH /api/v1/jobs/:id
// @access Public
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'Job updated', job: updatedJob });
};

// DELETE JOB
// @desc   Delete job
// @route  DELETE /api/v1/jobs/:id
// @access Public
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(eq.params.id);
  res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: removedJob });
};
