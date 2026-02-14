// import { Schema, model } from 'mongoose';

// const daySchema = new Schema(
//   {
//     dayNumber: Number,
//     phase: String,
//     phaseDescription: String,

//     qualities: [String],
//     generalMeaning: String,
//     warnings: [String],

//     dreams: {
//       title: String,
//       meaning: String,
//     },

//     lifeAspects: {
//       newActivities: String,
//       decisionMaking: String,
//       business: String,
//       money: String,
//       realEstate: String,
//       trade: String,
//       legalMatters: String,
//       science: String,
//       art: String,
//       creativity: String,
//       learningExams: String,
//       communication: String,
//       confrontation: String,
//       bossCommunication: String,
//       jobChange: String,
//       travel: String,
//       movement: String,
//       rest: String,
//       physicalActivity: String,
//       housework: String,
//       marriage: String,
//       intimacy: String,
//       conception: String,
//     },

//     birthOnThisDay: {
//       title: String,
//       description: String,
//     },

//     health: {
//       general: String,
//       vulnerableBodyPart: String,
//       medications: String,
//     },

//     nutrition: String,
//     alcohol: String,
//     smoking: String,

//     haircut: {
//       lunarCalendar: String,
//       tibetanCalendar: String,
//     },

//     symbols: [String],
//     stones: [String],
//     meditations: [String],

//     signs: {
//       bad: [String],
//       good: [String],
//     },

//     extendedMeaning: String,
//   },
//   {
//     collection: 'days', // ← ВАЖЛИВО: твоя існуюча колекція
//   },
// );

// export const Day = model('Day', daySchema);

import { Schema, model } from 'mongoose';

const daySchema = new Schema({
  dayNumber: { type: Number },
  phase: { type: String },
  phaseDescription: { type: String },
  qualities: {
    type: Array,
    items: { type: String },
  },
  generalMeaning: { type: String },
  warnings: {
    type: Array,
    items: { type: String },
  },
  dreams: {
    type: Object,
    properties: {
      title: { type: String },
      meaning: { type: String },
    },
  },
  lifeAspects: {
    type: Object,
    properties: {
      newActivities: { type: String },
      decisionMaking: { type: String },
      business: { type: String },
      money: { type: String },
      realEstate: { type: String },
      trade: { type: String },
      legalMatters: { type: String },
      science: { type: String },
      art: { type: String },
      creativity: { type: String },
      learningExams: { type: String },
      communication: { type: String },
      confrontation: { type: String },
      bossCommunication: { type: String },
      jobChange: { type: String },
      travel: { type: String },
      movement: { type: String },
      rest: { type: String },
      physicalActivity: { type: String },
      housework: { type: String },
      marriage: { type: String },
      intimacy: { type: String },
      conception: { type: String },
    },
  },
  birthOnThisDay: {
    type: Object,
    properties: {
      title: { type: String },
      description: { type: String },
    },
  },
  health: {
    type: Object,
    properties: {
      general: { type: String },
      vulnerableBodyPart: { type: String },
      medications: { type: String },
    },
  },
  nutrition: { type: String },
  alcohol: { type: String },
  smoking: { type: String },
  haircut: {
    type: Object,
    properties: {
      lunarCalendar: { type: String },
      tibetanCalendar: { type: String },
    },
  },
  symbols: {
    type: Array,
    items: { type: String },
  },
  stones: {
    type: Array,
    items: { type: String },
  },
  meditations: {
    type: Array,
    items: { type: String },
  },
  signs: {
    type: Object,
    properties: {
      bad: {
        type: Array,
        items: { type: String },
      },
      good: {
        type: Array,
        items: { type: String },
      },
    },
  },
  extendedMeaning: {
    type: String,
    description:
      'Довгий текстовий опис, який включає символіку, рекомендації, застереження та додаткові пояснення.',
  },
});

export const Day = model('Days', daySchema);
