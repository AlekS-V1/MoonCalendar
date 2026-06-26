import { cache } from './cache.js';
import { Day } from '../models/day.js';
import { Phase } from '../models/phase.js';
import { Haircut } from '../models/haircut.js';
import { Ritual } from '../models/ritual.js';
import { Magic } from '../models/magic.js';

const DETAILS_KEY = 'moon-details';
const PHASEDETAILS_KEY = 'moonphase-details';
const HAIRCUTDETAILS_KEY = 'haircut-details';
const RITUALDETAILS_KEY = 'ritual-details';
const MAGICDETAILS_KEY = 'magic-details';

export async function getAllMoonDetails() {
  if (cache.has(DETAILS_KEY)) return cache.get(DETAILS_KEY);

  const docs = await Day.find({}).lean();

  cache.set(DETAILS_KEY, docs, 24 * 60 * 60 * 1000);
  return docs;
}

export async function getAllHaircutDetails() {
  if (cache.has(HAIRCUTDETAILS_KEY)) {
    return cache.get(HAIRCUTDETAILS_KEY);
  }

  const haircutDocs = await Haircut.find({}).lean();
  cache.set(HAIRCUTDETAILS_KEY, haircutDocs, 24 * 60 * 60 * 1000);
  return haircutDocs;
}

// 1. Отримати всі документи phases (з кешем)
export async function getAllPhasesDetails() {
  if (cache.has(PHASEDETAILS_KEY)) {
    return cache.get(PHASEDETAILS_KEY);
  }
  const phaseDocs = await Phase.find({}).lean();
  // Кешуємо на 24 години
  cache.set(PHASEDETAILS_KEY, phaseDocs, 24 * 60 * 60 * 1000);
  return phaseDocs;
}

export async function getAllMagicDetails() {
  if (cache.has(MAGICDETAILS_KEY)) {
    return cache.get(MAGICDETAILS_KEY);
  }

  const magicDocs = await Magic.find({}).lean();
  cache.set(MAGICDETAILS_KEY, magicDocs, 24 * 60 * 60 * 1000);
  return magicDocs;
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

let haircutMapCache = null;

export async function getDetailsHaircutMap() {
  if (haircutMapCache) {
    return haircutMapCache;
  }
  const haircutDocs = await getAllHaircutDetails();
  const haircutMap = {};
  haircutDocs.forEach((d) => {
    const num = Number(d.dayNumber);
    haircutMap[num] = d;
    // const { dayNumber, ...rest } = d;
    // haircutMap[dayNumber] = rest;
  });
  haircutMapCache = haircutMap;
  return haircutMap;
}

export async function getDetailsByDayNumber(dayNumber) {
  const map = await getDetailsMap();
  return map[dayNumber] || null;
}

export async function getDetailsByHaircutNumber(dayNumber) {
  const map = await getDetailsHaircutMap();
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

// --- Rituals ---

// 1. Отримати всі документи рітуалів (з кешем)
export async function getAllRitualDetails() {
  if (cache.has(RITUALDETAILS_KEY)) {
    return cache.get(RITUALDETAILS_KEY);
  }
  const ritualDocs = await Ritual.find({}).lean();
  // Кешуємо на 24 години
  cache.set(RITUALDETAILS_KEY, ritualDocs, 24 * 60 * 60 * 1000);
  return ritualDocs;
}

export async function getRitualsMap() {
  const docs = await getAllRitualDetails();
  const map = {};
  docs.forEach((d) => {
    const { day, ...rest } = d;
    map[day] = rest;
  });
  return map;
}

// ---

export async function getMagicsMap() {
  const docs = await getAllMagicDetails();
  const map = {};
  docs.forEach((d) => {
    const { day, ...rest } = d;
    map[day] = rest;
  });
  return map;
}
