import { Day } from '../models/day.js';
import createHttpError from 'http-errors';
import { cache } from '../service/cache.js';
import { buildMonth, buildToday } from '../service/calendar.js';
import { getYearCalendar } from '../service/year.js';
import { deepSearch } from '../service/deepSearch.js';
import {
  getMoonDay,
  getMoonDayFromString,
  getMoonDayFromStringHaircut,
  getMoonDayFromStringRitual,
  getMoonPhase,
} from '../service/moon.js';
import {
  getAllHaircutDetails,
  getAllMoonDetails,
  getAllPhasesDetails,
  getAllValues,
  getDetailsByHaircutNumber,
  getDetailsByPhaseNumber,
  getDetailsHaircutMap,
  getDetailsPhaseMap,
  // getRitualsMap,
} from '../service/moonDetails.js';
import { formatMoonDay } from '../service/formatSearch.js';
import { Haircut } from '../models/haircut.js';

export const getDays = async (req, res) => {
  const moonDay = await Day.find().populate([
    { path: 'phase.phaseId' },
    { path: 'haircut.haircutId' },
  ]);
  res.status(200).json({ moonDay });
};

export const getDayId = async (req, res) => {
  const { dayId } = req.params;
  const moonDay = await Day.findById(dayId).populate([
    { path: 'phase.phaseId' },
    { path: 'haircut.haircutId' },
  ]);

  if (!moonDay) {
    throw createHttpError(404, 'Day not found!');
  }
  res.status(200).json(moonDay);
};

export const getToday = async (req, res) => {
  const key = 'today';
  // 1. Якщо дані є в кеші — миттєво повертаємо їх
  if (cache.has(key)) return res.json(cache.get(key));
  // 2. Якщо в кеші пусто — будуємо нові актуальні дані
  const data = await buildToday();
  // 3. Вираховуємо, скільки часу залишилося до кінця цього місячного дня
  const now = new Date().getTime();
  const endTime = new Date(data.nextDayStart).getTime();

  // Час життя кешу = кінець дня мінус поточний момент
  const timeToLive = endTime - now;

  // Безпечна перевірка: якщо раптом час уже минув, ставимо мінімальний кеш на 1 хвилину
  const cacheDuration = timeToLive > 0 ? timeToLive : 60 * 1000;

  // 4. Записуємо в кеш рівно до моменту зміни місячної доби

  cache.set(key, data, cacheDuration);
  res.json(data);
};

export const getMonth = async (req, res) => {
  const year = Number(req.query.year);
  const month = Number(req.query.month);
  const key = `month-${year}-${month}`;
  if (cache.has(key)) return res.json(cache.get(key));
  const data = await buildMonth(year, month);
  cache.set(key, data, 24 * 60 * 60 * 1000);
  res.json(data);
};

export const getSearchMultiple = async (req, res) => {
  const raw = req.query.query || '';
  const terms = raw
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (!terms.length) return res.json({ results: [] });

  // 1. Отримуємо всі описи з вашого кешу
  const allDetails = await getAllMoonDetails();

  // 2. Фільтруємо описи, які містять пошукові терміни
  const matchedDetails = allDetails
    .filter((detail) => {
      const text = getAllValues(detail).join(' ').toLowerCase();
      return terms.every((t) => text.includes(t));
    })
    .map((d) => d.dayNumber);

  // Створюємо карту (Map) для швидкого доступу: { dayNumber: detailObject }
  // const detailsLookup = {};
  // matchedDetails.forEach((d) => {
  //   detailsLookup[d.dayNumber] = d;
  // });

  // 3. Отримуємо календар на рік
  const year = new Date().getFullYear();
  const days = await getYearCalendar(year);

  // 4. Формуємо результат: дата + повний опис
  const results = days
    .filter((day) => matchedDetails.includes(day.moonDay)) // Беремо лише дні з відповідним moonDay
    .map((day) => {
      const detail = allDetails.find((d) => d.dayNumber === day.moonDay); // Додаємо знайдений опис прямо в об'єкт
      return formatMoonDay(day, detail);
    });
  // const text = Object.values(day.details || {})
  //   .filter((v) => typeof v === 'string')
  //   .join(' ')
  //   .toLowerCase();
  // return terms.every((t) => text.includes(t));

  res.json({
    meta: {
      year,
      totalFound: results.length,
      query: terms,
    },
    results,
  });
};

export const getLuckyDay = async (req, res, next) => {
  try {
    const key = req.query.key;
    const value = (req.query.value || '').trim();

    if (!key) {
      throw createHttpError(400, { errors: ['key is required'] });
    }
    if (!value) {
      throw createHttpError(400, { errors: ['value is required'] });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = today.getFullYear();
    const days = await getYearCalendar(year);

    // --- 1. Пошук по ключу та суворому значенню ---
    const matched = days.filter((day) => {
      const matches = deepSearch(day.details, key, value);

      if (matches.length > 0) {
        console.log(`MATCH FOUND in day ${day.details?._id} (${day.date})`);
        console.log('Matches:', matches);
      } else {
        console.log(`NO MATCH in day ${day.details?._id}`);
      }

      return matches.length > 0;
    });

    // console.log('Matched days before unique:', matched.length);

    // --- 2. Унікалізація днів за _id та датою ---
    const unique = [];
    const seen = new Set();

    for (const item of matched) {
      const id = item.details?._id;
      const date = item.date;
      const uniqueKey = `${id}_${date}`;

      if (!id) {
        console.warn('WARNING: day without _id:', item);
      }

      if (!seen.has(uniqueKey)) {
        unique.push(item);
        seen.add(uniqueKey);
      } else {
        console.log(`DUPLICATE REMOVED: ${uniqueKey}`);
      }
    }

    console.log('Unique matched days:', unique.length);

    // Логування дат MATCH-ів перед фільтрацією futureOnly
    unique.forEach((day) => {
      console.log(`MATCH DAY: ${day.details?._id} (${day.date})`);
    });

    // --- 3. Відкидаємо минулі дні ---
    const futureOnly = unique.filter((day) => {
      const date = new Date(day.date);
      date.setHours(12, 0, 0, 0);

      const isFuture = date >= today;

      if (!isFuture) {
        console.log(`PAST DAY REMOVED: ${day.details?._id} (${day.date})`);
      }

      return isFuture;
    });

    console.log('Future-only days:', futureOnly.length);

    if (!futureOnly.length) {
      console.log('=== FINAL RESULT: EMPTY ===');
      return res.json({ result: [] });
    }

    // --- 4. Сортуємо за близькістю до сьогодні ---
    const sorted = futureOnly
      .map((day) => ({
        day,
        dist: Math.abs(new Date(day.date) - today),
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 5)
      .map((item) => item.day);

    console.log('=== FINAL RESULT COUNT:', sorted.length, ' ===');

    res.json({ result: sorted });
  } catch (err) {
    console.error('ERROR in getLuckyDay:', err);
    next(err);
  }
};

// --- 5. Пошук місячного дня за датою календаря ---

export const getMoonDayByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'date is required (YYYY-MM-DD)' });
    }

    const result = await getMoonDayFromString(date);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
    next(err);
  }
};

//  -- PHASES --

// GET /phases — повертає всі фази
export async function getAllPhases(req, res) {
  try {
    const phases = await getAllPhasesDetails();
    res.json(phases);
  } catch (error) {
    console.error('Error in getAllPhases:', error);
    res.status(500).json({ error: 'Failed to load phases' });
  }
}

// GET /byphase?phaseNumber=3

export async function getPhaseByNumber(req, res) {
  try {
    const phaseNumber = Number(req.query.phaseNumber);

    if (!phaseNumber) {
      return res.status(400).json({ error: 'phaseNumber is required' });
    }
    const phase = await getDetailsByPhaseNumber(phaseNumber);
    if (!phase) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    return res.json(phase);
  } catch (error) {
    console.error('Error in getPhaseByNumber:', error);
    res.status(500).json({ error: 'Failed to load phase' });
  }
}

// GET /phasebyday?moonDay=5
export async function getPhaseByMoonDay(req, res) {
  try {
    const moonDay = Number(req.query.moonDay);

    if (!moonDay) {
      return res.status(400).json({ error: 'moonDay is required' });
    }

    // Мапінг moonDay → phaseNumber
    let phaseNumber = 1;
    if (moonDay >= 1 && moonDay <= 7) phaseNumber = 1;
    else if (moonDay >= 8 && moonDay <= 14) phaseNumber = 2;
    else if (moonDay >= 15 && moonDay <= 22) phaseNumber = 3;
    else phaseNumber = 4; // 23–29/30

    const phase = await getDetailsByPhaseNumber(phaseNumber);

    if (!phase) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    res.json(phase);
  } catch (err) {
    console.error('Error in getPhaseByMoonDay:', err);
    res.status(500).json({ error: 'Failed to load phase' });
  }
}

export async function getTodayPhase(req, res) {
  try {
    const today = new Date();
    const moonDay = getMoonDay(today);

    // 1. Астрономічна фаза (0–1)
    const rawPhase = getMoonPhase(today);

    // 2. Перетворюємо у редакційний phaseNumber (1–4)
    const phaseNumber =
      rawPhase < 0.25 ? 1 : rawPhase < 0.5 ? 2 : rawPhase < 0.75 ? 3 : 4;

    const phaseMap = await getDetailsPhaseMap();
    const todayPhase = phaseMap[phaseNumber];

    if (!todayPhase) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    return res.json({
      date: today.toISOString().slice(0, 10),
      moonDay,
      rawPhase,
      phaseNumber,
      ...todayPhase,
    });
  } catch (error) {
    console.error('Error in getTodayPhase:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// -- Haircut days ---

export const getHaircutDayId = async (req, res) => {
  const { dayId } = req.params;
  const moonDay = await Haircut.findById(dayId);

  if (!moonDay) {
    throw createHttpError(404, 'Day not found!');
  }
  res.status(200).json(moonDay);
};

// GET /haircutdays

export async function getAllHaircutDays(req, res) {
  try {
    const haircutDays = await getAllHaircutDetails();
    res.json(haircutDays);
  } catch (error) {
    console.error('Error in getAllPhases:', error);
    res.status(500).json({ error: 'Failed to load phases' });
  }
}

// GET /haircutbyday?moonDay=1
export async function getHaircutByMoonDay(req, res) {
  try {
    const moonDay = Number(req.query.moonDay);

    if (!moonDay) {
      return res.status(400).json({ error: 'moonDay is required' });
    }

    const haircutDay = await getDetailsByHaircutNumber(moonDay);

    if (!haircutDay) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    res.json(haircutDay);
  } catch (err) {
    console.error('Error in getHaircutByMoonDay:', err);
    res.status(500).json({ error: 'Failed to load phase' });
  }
}

// GET /todayhaircut

export async function getTodayHaircut(req, res) {
  try {
    const today = new Date();
    const moonDay = getMoonDay(today);

    const haircutMap = await getDetailsHaircutMap();
    const todayHaircut = haircutMap[moonDay];

    if (!todayHaircut) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    return res.json({
      date: today.toISOString().slice(0, 10),
      ...todayHaircut,
    });
  } catch (error) {
    console.error('Error in getTodayHaircut:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// ---  Пошук дня стріжки за датою календаря ---

export const getHaircutDayByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'date is required (YYYY-MM-DD)' });
    }

    const result = await getMoonDayFromStringHaircut(date);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
    next(err);
  }
};

// --- RITUAL --- //

// GET /todayritual

export async function getTodayRitual(req, res) {
  try {
    const key = 'todayRitual';

    if (cache.has(key)) return res.json(cache.get(key));
    const todayDate = new Date();
    // const moonDay = getMoonDay(today);
    const moonDay = todayDate.toISOString().slice(0, 10);

    // const ritualMap = await getRitualsMap();
    const todayRitual = await getMoonDayFromStringRitual(moonDay);
    // const todayRitual = ritualMap[moonDay];

    const now = new Date().getTime();
    const endTime = new Date(todayRitual.nextDayStart).getTime();

    const timeToLive = endTime - now;

    const cacheDuration = timeToLive > 0 ? timeToLive : 5 * 60 * 1000;

    // 4. Записуємо в кеш рівно до моменту зміни місячної доби

    cache.set(key, todayRitual, cacheDuration);

    if (!todayRitual) {
      return res.status(404).json({ error: 'Phase not found' });
    }

    return res.json({
      // date: today.toISOString().slice(0, 10),
      ...todayRitual,
    });
  } catch (error) {
    console.error('Error in getTodayRitual:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// ---  Пошук дня рітуала за датою календаря ---

export const getRitualDayByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'date is required (YYYY-MM-DD)' });
    }

    const result = await getMoonDayFromStringRitual(date);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
    next(err);
  }
};
