import { Router } from 'express';
import { getDayId, getDays } from '../controllers/daysController.js';

const router = Router();

router.get('/days', getDays);

router.get('/days/:dayId', getDayId);

export default router;
