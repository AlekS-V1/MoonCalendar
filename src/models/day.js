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
