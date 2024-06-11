import { Router } from 'express';
const router = Router();
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js';
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getJobs)
  .post(checkForTestUser, validateJobInput, createJob);
router.route('/stats').get(showStats);
router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
