// // lib/moon.js
// import { julian } from 'astronomia';

// const SYNODIC_MONTH = 29.530588861;

// // Meeus: обчислення моменту молодика (k — номер синодичного місяця)
// function trueNewMoon(k) {
//   const T = k / 1236.85;
//   const T2 = T * T;
//   const T3 = T2 * T;
//   const T4 = T3 * T;

//   // Юліанська дата середнього молодика
//   let JDE =
//     2451550.09765 +
//     SYNODIC_MONTH * k +
//     0.0001337 * T2 -
//     0.00000015 * T3 +
//     0.00000000073 * T4;

//   // Сонячна аномалія
//   const M =
//     (2.5534 + 29.1053567 * k - 0.0000014 * T2 - 0.00000011 * T3) *
//     (Math.PI / 180);

//   // Місячна аномалія
//   const Mprime =
//     (201.5643 +
//       385.81693528 * k +
//       0.0107582 * T2 +
//       0.00001238 * T3 -
//       0.000000058 * T4) *
//     (Math.PI / 180);

//   // Аргумент широти
//   const F =
//     (160.7108 +
//       390.67050274 * k -
//       0.0016118 * T2 -
//       0.00000227 * T3 +
//       0.000000011 * T4) *
//     (Math.PI / 180);

//   // Поправки
//   JDE +=
//     -0.4072 * Math.sin(Mprime) +
//     0.17241 * Math.sin(M) +
//     0.01608 * Math.sin(2 * Mprime) +
//     0.01039 * Math.sin(2 * F) +
//     0.00739 * Math.sin(Mprime - M) -
//     0.00514 * Math.sin(Mprime + M) +
//     0.00208 * Math.sin(2 * M) -
//     0.00111 * Math.sin(Mprime - 2 * F) -
//     0.00057 * Math.sin(Mprime + 2 * F) +
//     0.00056 * Math.sin(2 * Mprime + M) -
//     0.00042 * Math.sin(3 * Mprime) +
//     0.00042 * Math.sin(M + 2 * F) +
//     0.00038 * Math.sin(M - 2 * F) -
//     0.00024 * Math.sin(2 * Mprime - M) -
//     0.00017 * Math.sin(F) -
//     0.00007 * Math.sin(Mprime + 2 * M) +
//     0.00004 * Math.sin(2 * Mprime - 2 * F) +
//     0.00004 * Math.sin(3 * M) +
//     0.00003 * Math.sin(Mprime + M - 2 * F) +
//     0.00003 * Math.sin(2 * Mprime + 2 * F) -
//     0.00003 * Math.sin(Mprime + M + 2 * F) +
//     0.00003 * Math.sin(Mprime - M + 2 * F) -
//     0.00002 * Math.sin(Mprime - M - 2 * F) -
//     0.00002 * Math.sin(3 * Mprime + M);

//   return JDE;
// }

// // Знаходимо найближчий попередній молодик
// export function getNewMoon(date) {
//   const jd = julian.DateToJD(date);
//   const k = Math.floor((jd - 2451550.09765) / SYNODIC_MONTH);
//   const newMoonJD = trueNewMoon(k);

//   const newMoonDate = julian.JDToDate(newMoonJD);

//   if (newMoonDate > date) {
//     return julian.JDToDate(trueNewMoon(k - 1));
//   }

//   return newMoonDate;
// }

// export function getMoonAge(date) {
//   return (date - getNewMoon(date)) / 86400000;
// }

// export function getMoonDay(date) {
//   return Math.floor(getMoonAge(date)) + 1;
// }

// export function getMoonPhase(date) {
//   const age = getMoonAge(date);
//   return (age % SYNODIC_MONTH) / SYNODIC_MONTH;
// }

// export function getMoonPhaseName(date) {
//   const p = getMoonPhase(date);

//   if (p < 0.03 || p > 0.97) return 'молодик';
//   if (p < 0.22) return 'зростаючий серп';
//   if (p < 0.28) return 'перша чверть';
//   if (p < 0.47) return 'зростаючий Місяць';
//   if (p < 0.53) return 'повня';
//   if (p < 0.72) return 'спадний Місяць';
//   if (p < 0.78) return 'остання чверть';
//   return 'спадний серп';
// }

// export function getMoonInfo(date = new Date()) {
//   const newMoon = getNewMoon(date);
//   const ageDays = getMoonAge(date);

//   return {
//     date: date.toISOString(),
//     newMoonUTC: newMoon.toISOString(),
//     ageDays,
//     moonDay: getMoonDay(date),
//     phase: getMoonPhase(date),
//     phaseName: getMoonPhaseName(date),
//   };
// }

// lib/moon.js
import { julian } from 'astronomia';

const SYNODIC_MONTH = 29.530588861;

// -----------------------------
// 1. БАЗОВІ ФУНКЦІЇ
// -----------------------------

function dateToJD(date) {
  return julian.DateToJD(date);
}

function jdToDate(jd) {
  return julian.JDToDate(jd);
}

// -----------------------------
// 2. ТОЧНИЙ МЕТОД МІЮСА (КОМПАКТНИЙ)
// -----------------------------

function truePhase(k) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;

  const M =
    (2.5534 + 29.1053567 * k - 0.0000014 * T2 - 0.00000011 * T3) *
    (Math.PI / 180);
  const Mprime =
    (201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3) *
    (Math.PI / 180);
  const F =
    (160.7108 + 390.67050274 * k - 0.0016118 * T2 - 0.00000227 * T3) *
    (Math.PI / 180);

  let JDE =
    2451550.09765 +
    SYNODIC_MONTH * k +
    0.0001337 * T2 -
    0.00000015 * T3 +
    0.00000000073 * T3 * T;

  JDE +=
    -0.4072 * Math.sin(Mprime) +
    0.17241 * Math.sin(M) +
    0.01608 * Math.sin(2 * Mprime) +
    0.01039 * Math.sin(2 * F) +
    0.00739 * Math.sin(Mprime - M) -
    0.00514 * Math.sin(Mprime + M) +
    0.00208 * Math.sin(2 * M) -
    0.00111 * Math.sin(Mprime - 2 * F) -
    0.00057 * Math.sin(Mprime + 2 * F) +
    0.00056 * Math.sin(2 * Mprime + M) -
    0.00042 * Math.sin(3 * Mprime) +
    0.00042 * Math.sin(M + 2 * F) +
    0.00038 * Math.sin(M - 2 * F) -
    0.00024 * Math.sin(2 * Mprime - M) -
    0.00017 * Math.sin(F) -
    0.00007 * Math.sin(Mprime + 2 * M) +
    0.00004 * Math.sin(2 * Mprime - 2 * F) +
    0.00004 * Math.sin(3 * M) +
    0.00003 * Math.sin(Mprime + M - 2 * F) +
    0.00003 * Math.sin(2 * Mprime + 2 * F) -
    0.00003 * Math.sin(Mprime + M + 2 * F) +
    0.00003 * Math.sin(Mprime - M + 2 * F) -
    0.00002 * Math.sin(Mprime - M - 2 * F) -
    0.00002 * Math.sin(3 * Mprime + M);

  return JDE;
}

// -----------------------------
// 3. ФАЗИ МІСЯЦЯ (ПРАВИЛЬНИЙ k)
// -----------------------------

function getPhase(date, offset) {
  const jd = dateToJD(date);
  const k = Math.floor((jd - 2451550.09765) / SYNODIC_MONTH);

  let jdPhase = truePhase(k + offset);
  let d = jdToDate(jdPhase);

  if (d > date) {
    jdPhase = truePhase(k + offset - 1);
    d = jdToDate(jdPhase);
  }

  return d;
}

export function getNewMoon(date) {
  return getPhase(date, 0);
}

export function getFirstQuarter(date) {
  return getPhase(date, 0.25);
}

export function getFullMoon(date) {
  return getPhase(date, 0.5);
}

export function getLastQuarter(date) {
  return getPhase(date, 0.75);
}

// -----------------------------
// 4. ФАЗА, ВІК, МІСЯЧНИЙ ДЕНЬ
// -----------------------------

export function getMoonAge(date) {
  return (date - getNewMoon(date)) / 86400000;
}

export function getMoonDay(date) {
  return Math.floor(getMoonAge(date)) + 1;
}

export function getMoonPhase(date) {
  const age = getMoonAge(date);
  return (age % SYNODIC_MONTH) / SYNODIC_MONTH;
}

export function getMoonPhaseName(date) {
  const p = getMoonPhase(date);

  if (p < 0.03 || p > 0.97) return 'молодик';
  if (p < 0.22) return 'зростаючий серп';
  if (p < 0.28) return 'перша чверть';
  if (p < 0.47) return 'зростаючий Місяць';
  if (p < 0.53) return 'повня';
  if (p < 0.72) return 'спадний Місяць';
  if (p < 0.78) return 'остання чверть';
  return 'спадний серп';
}

// -----------------------------
// 5. КАЛЕНДАР НА МІСЯЦЬ
// -----------------------------

export function getMonthCalendar(year, month) {
  const days = new Date(year, month + 1, 0).getDate();
  const result = [];

  for (let d = 1; d <= days; d++) {
    const date = new Date(Date.UTC(year, month, d));
    result.push({
      date: date.toISOString(),
      moonDay: getMoonDay(date),
      phase: getMoonPhase(date),
      phaseName: getMoonPhaseName(date),
    });
  }

  return result;
}

// -----------------------------
// 6. ГОЛОВНА ФУНКЦІЯ
// -----------------------------

export function getMoonInfo(date = new Date()) {
  return {
    date: date.toISOString(),
    newMoon: getNewMoon(date).toISOString(),
    firstQuarter: getFirstQuarter(date).toISOString(),
    fullMoon: getFullMoon(date).toISOString(),
    lastQuarter: getLastQuarter(date).toISOString(),
    moonDay: getMoonDay(date),
    phase: getMoonPhase(date),
    phaseName: getMoonPhaseName(date),
  };
}
