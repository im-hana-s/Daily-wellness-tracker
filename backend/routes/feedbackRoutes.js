import express from 'express';
import { submit } from '../controllers/feedbackController.js';
const router = express.Router();
router.post('/', submit);
export default router;
