import Job from '../models/jobModel.js';
import { NotFoundError } from '../errors/customError.js';
import { StatusCodes } from 'http-status-codes';

// GET ALL JOBS
// @desc   Fetch all jobs
// @route  GET /api/v1/jobs
// @access Public
export const getJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

// GET SINGLE JOB
// @desc   Fetch all jobs
// @route  GET /api/v1/jobs/:id
// @access Public
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`No job with id ${id} found`);
  res.status(StatusCodes.OK).json({ job });
};

// CREATE JOB
// @desc   Create job
// @route  POST /api/v1/jobs
// @access Public
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  try {
    const job = await Job.create({ company, position });
    res.status(StatusCodes.CREATED).json({ msg: 'Job updated', job });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

// EDIT JOB
// @desc   Update job
// @route  PATCH /api/v1/jobs/:id
// @access Public
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) throw new NotFoundError(`No job with id ${id} found`);

  res.status(StatusCodes.OK).json({ msg: 'Job updated', job: updatedJob });
};

// DELETE JOB
// @desc   Delete job
// @route  PATCH /api/v1/jobs/:id
// @access Public
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) throw new NotFoundError(`No job with id ${id} found`);
  res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: removedJob });
};
