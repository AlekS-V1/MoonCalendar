import { Router } from 'express';
import {
  getDayId,
  getDays,
  getLuckyDay,
  getMonth,
  getSearchMultiple,
  getToday,
  getMoonDayByDate,
  getAllPhases,
  getPhaseByMoonDay,
  getPhaseByNumber,
  getAllHaircutDays,
  getHaircutByMoonDay,
  getTodayPhase,
  getTodayHaircut,
  getHaircutDayId,
  getHaircutDayByDate,
  getTodayRitual,
  getRitualDayByDate,
  getMeditationDayId,
  getMagicDayId,
  getAllMagicDays,
  getTodayMagic,
  getMagicDayByDate,
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

router.get(
  '/moon-day',
  validateParams({
    date: { required: true, type: 'string', pattern: /^\d{4}-\d{2}-\d{2}$/ },
  }),
  getMoonDayByDate,
);

router.get('/phases', getAllPhases);
router.get('/byphase', getPhaseByNumber);
router.get('/phasebyday', getPhaseByMoonDay);
router.get('/phasetoday', getTodayPhase);

router.get('/haircutday/:dayId', getHaircutDayId);
router.get('/haircutdays', getAllHaircutDays);
router.get('/haircutbyday', getHaircutByMoonDay);
router.get('/todayhaircut', getTodayHaircut);
router.get(
  '/haircut-day',
  validateParams({
    date: { required: true, type: 'string', pattern: /^\d{4}-\d{2}-\d{2}$/ },
  }),
  getHaircutDayByDate,
);

router.get('/ritual-day/:dayId', getMeditationDayId);
router.get('/todayritual', getTodayRitual);
router.get(
  '/ritual-day',
  validateParams({
    date: { required: true, type: 'string', pattern: /^\d{4}-\d{2}-\d{2}$/ },
  }),
  getRitualDayByDate,
);

router.get('/magic-day/:dayId', getMagicDayId);
router.get('/magicdays', getAllMagicDays);
router.get('/todaymagic', getTodayMagic);
router.get(
  '/magic-day',
  validateParams({
    date: { required: true, type: 'string', pattern: /^\d{4}-\d{2}-\d{2}$/ },
  }),
  getMagicDayByDate,
);

export default router;
