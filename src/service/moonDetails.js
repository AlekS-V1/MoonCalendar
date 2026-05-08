import { cache } from './cache.js';
import { Day } from '../models/day.js';
import { Phase } from '../models/phase.js';

const DETAILS_KEY = 'moon-details';
const PHASEDETAILS_KEY = 'moonphase-details';

export async function getAllMoonDetails() {
  if (cache.has(DETAILS_KEY)) return cache.get(DETAILS_KEY);

  const docs = await Day.find({}).lean();

  cache.set(DETAILS_KEY, docs, 24 * 60 * 60 * 1000);
  return docs;
}

export async function getAllPhasesDetails() {
  if (cache.has(PHASEDETAILS_KEY)) return cache.get(PHASEDETAILS_KEY);
  const phaseDocs = await Phase.find({}).lean();

  cache.set(PHASEDETAILS_KEY, phaseDocs, 24 * 60 * 60 * 1000);

  return phaseDocs;
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

export async function getDetailsPhaseMap() {
  const phaseDocs = await getAllPhasesDetails();
  const phaseMap = {};
  phaseDocs.forEach((d) => {
    const { phaseNumber, ...rest } = d;
    phaseMap[phaseNumber] = rest;
  });
  return phaseMap;
}

export async function getDetailsByDayNumber(dayNumber) {
  const map = await getDetailsMap();
  return map[dayNumber] || null;
}

export async function getDetailsByPhaseNumber(phaseNumber) {
  const phaseMap = await getDetailsPhaseMap();
  return phaseMap[phaseNumber] || null;
}

// Використовуємо рекурсивну функцію для збору тексту
export const getAllValues = (obj) => {
  let values = [];
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      values.push(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      values = values.concat(getAllValues(obj[key]));
    }
  }
  return values;
};
