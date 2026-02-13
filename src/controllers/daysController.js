import { Day } from '../models/day.js';
import createHttpError from 'http-errors';
import { cache } from '../service/cache.js';
import { buildMonth, buildToday } from '../service/calendar.js';
import { getYearCalendar } from '../service/year.js';
// import { getMoonInfo } from '../service/moon.js';

export const getDays = async (req, res) => {
  const moonDay = await Day.find();
  res.status(200).json({ moonDay });
};

export const getDayId = async (req, res) => {
  const { dayId } = req.params;
  const moonDay = await Day.findById(dayId);

  if (!moonDay) {
    throw createHttpError(404, 'Day not found!');
  }
  res.status(200).json(moonDay);
};

export const getToday = async (req, res) => {
  // try {
  //   const info = await getMoonInfo(new Date());
  //   res.status(200).json(info);
  // } catch (err) {
  //   console.error('Moon calc error:', err);
  //   res.status(500).json({ error: 'Moon calculation failed' });
  // }

  const key = 'today';
  if (cache.has(key)) return res.json(cache.get(key));
  const data = await buildToday();
  cache.set(key, data, 24 * 60 * 60 * 1000);
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
  const year = new Date().getFullYear();
  const days = await getYearCalendar(year);
  const results = days.filter((day) => {
    const text = Object.values(day.details || {})
      .filter((v) => typeof v === 'string')
      .join(' ')
      .toLowerCase();
    return terms.every((t) => text.includes(t));
  });
  res.json({ results });
};

export const getLuckyDay = async (req, res) => {
  const key = req.query.key;
  const value = (req.query.value || '').toLowerCase();
  if (!key || !value) return res.json({ result: null });
  const today = new Date();
  const year = today.getFullYear();
  const days = await getYearCalendar(year);
  const matched = days.filter((day) => {
    const field = day.details?.[key];
    return typeof field === 'string' && field.toLowerCase().includes(value);
  });
  if (!matched.length) return res.json({ result: null });
  const nearest = matched.reduce(
    (best, day) => {
      const dist = Math.abs(new Date(day.date) - today);
      return dist < best.dist ? { day, dist } : best;
    },
    { day: null, dist: Infinity },
  ).day;
  res.json({ result: nearest });
};
