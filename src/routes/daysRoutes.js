import { Router } from 'express';
import {
  getDayId,
  getDays,
  getLuckyDay,
  getMonth,
  getSearchMultiple,
  getToday,
} from '../controllers/daysController.js';

const router = Router();

router.get('/days', getDays);

router.get('/days/:dayId', getDayId);

router.get('/today', getToday);

router.get('/month', getMonth); // month-:year-:month or month

router.get('/search-multiple', getSearchMultiple);

router.get('/lucky-day', getLuckyDay);

export default router;
