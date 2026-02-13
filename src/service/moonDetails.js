import { cache } from './cache.js';
import { Day } from '../models/day.js';

const DETAILS_KEY = 'moon-details';

export async function getAllMoonDetails() {
  if (cache.has(DETAILS_KEY)) return cache.get(DETAILS_KEY);

  const docs = await Day.find({}).lean();

  cache.set(DETAILS_KEY, docs, 24 * 60 * 60 * 1000);
  return docs;
}

export async function getDetailsMap() {
  const docs = await getAllMoonDetails();
  const map = {};
  docs.forEach((d) => {
    const { dayNumber, ...rest } = d;
    map[dayNumber] = rest;
  });
  return map;
}

export async function getDetailsByDayNumber(dayNumber) {
  const map = await getDetailsMap();
  return map[dayNumber] || null;
}
