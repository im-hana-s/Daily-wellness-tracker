import express from 'express';
import { upsertLog, getLog } from '../controllers/logController.js';

const router = express.Router();

router.get('/', getLog);
router.post('/', upsertLog);

export default router;
