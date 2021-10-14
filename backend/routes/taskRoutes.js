import express from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createTask).get(protect, getTasks)
router.route('/:id').delete(protect, deleteTask).put(protect, updateTask)

export default router