import { Router } from 'express';
import {
  getDayId,
  getDays,
  getLuckyDay,
  getMonth,
  getSearchMultiple,
  getToday,
} from '../controllers/daysController.js';
import { heavyLimiter, searchLimiter } from '../middleware/index.js';
import { validateParams } from '../middleware/validate.js';

const router = Router();

router.get('/days', getDays);

router.get('/days/:dayId', getDayId);

router.get('/today', getToday);

router.get(
  '/month',
  validateParams({
    year: { required: true, type: 'number', min: 1900, max: 2100 },
    month: { required: true, type: 'number', min: 1, max: 12 },
  }),
  getMonth,
);

router.get('/search-multiple', searchLimiter, getSearchMultiple);

router.get(
  '/lucky-day',
  heavyLimiter,
  validateParams({
    key: { required: true, type: 'string' },
    value: { required: true, type: 'string' },
  }),
  getLuckyDay,
);

export default router;
