import { cache } from './cache.js';
import { buildMonth } from './calendar.js';

export async function getYearCalendar(year) {
  const key = `year-${year}`;
  if (cache.has(key)) return cache.get(key);

  const days = [];

  for (let m = 1; m <= 12; m++) {
    const month = await buildMonth(year, m);
    days.push(...month.calendar);
  }

  cache.set(key, days, 24 * 60 * 60 * 1000);
  return days;
}
