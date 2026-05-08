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
// 1. Отримати всі документи phases (з кешем)
export async function getAllPhasesDetails() {
  if (cache.has(PHASEDETAILS_KEY)) {
    return cache.get(PHASEDETAILS_KEY);
  }
  const phaseDocs = await Phase.find({}).lean();
  // Кешуємо на 24 години
  cache.set(PHASEDETAILS_KEY, phaseDocs, 24 * 60 * 60 * 1000);
  console.log('PHASE DOCS RAW:', phaseDocs);

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

// Локальний кеш для мапи (не TTL, оновлюється разом із PHASEDETAILS_KEY)
let phaseMapCache = null;

// 2. Створити мапу { phaseNumber: phaseData }
export async function getDetailsPhaseMap() {
  if (phaseMapCache) {
    return phaseMapCache;
  }
  const phaseDocs = await getAllPhasesDetails();
  const phaseMap = {};
  phaseDocs.forEach((d) => {
    const num = Number(d.phaseNumber);
    phaseMap[num] = d;

    // const { phaseNumber, ...rest } = d;
    // phaseMap[phaseNumber] = rest;
  });

  phaseMapCache = phaseMap;
  return phaseMap;
}

export async function getDetailsByDayNumber(dayNumber) {
  const map = await getDetailsMap();
  return map[dayNumber] || null;
}

// 3. Отримати дані за номером фази
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
