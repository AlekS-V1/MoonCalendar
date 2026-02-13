import { Schema, model } from 'mongoose';

const daySchema = new Schema(
  {
    dayNumber: Number,
    phase: String,
    phaseDescription: String,

    qualities: [String],
    generalMeaning: String,
    warnings: [String],

    dreams: {
      title: String,
      meaning: String,
    },

    lifeAspects: {
      newActivities: String,
      decisionMaking: String,
      business: String,
      money: String,
      realEstate: String,
      trade: String,
      legalMatters: String,
      science: String,
      art: String,
      creativity: String,
      learningExams: String,
      communication: String,
      confrontation: String,
      bossCommunication: String,
      jobChange: String,
      travel: String,
      movement: String,
      rest: String,
      physicalActivity: String,
      housework: String,
      marriage: String,
      intimacy: String,
      conception: String,
    },

    birthOnThisDay: {
      title: String,
      description: String,
    },

    health: {
      general: String,
      vulnerableBodyPart: String,
      medications: String,
    },

    nutrition: String,
    alcohol: String,
    smoking: String,

    haircut: {
      lunarCalendar: String,
      tibetanCalendar: String,
    },

    symbols: [String],
    stones: [String],
    meditations: [String],

    signs: {
      bad: [String],
      good: [String],
    },

    extendedMeaning: String,
  },
  {
    collection: 'days', // ← ВАЖЛИВО: твоя існуюча колекція
  },
);

export const Day = model('Day', daySchema);
