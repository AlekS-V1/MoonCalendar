import { getMonthCalendar, getMoonInfo } from './moon.js';
import { getDetailsMap, getDetailsByDayNumber } from './moonDetails.js';

export async function buildMonth(year, month) {
  const calendar = getMonthCalendar(year, month);
  const map = await getDetailsMap();

  const enriched = calendar.map((day) => ({
    ...day,
    details: map[day.moonDay] || {},
  }));

  return {
    year,
    month,
    days: enriched.length,
    calendar: enriched,
  };
}

export async function buildToday() {
  const info = getMoonInfo(new Date());
  const details = await getDetailsByDayNumber(info.moonDay);

  return {
    date: info.date,
    moonDay: info.moonDay,
    phase: info.phase,
    phaseName: info.phaseName,
    details: details || {},
  };
}
