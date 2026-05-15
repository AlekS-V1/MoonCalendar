// import { Schema, model } from 'mongoose';

// ----------------------
// ПІДСХЕМИ
// ----------------------

// const RatingSchema = new Schema(
//   {
//     value: Number,
//     scale: Number,
//     meaning: String,
//   },
//   { _id: false },
// );

// const HaircutSchema = new Schema(
//   {
//     haircutId: { type: Schema.Types.ObjectId, ref: 'Haircut' },
//     lunarCalendar: String,
//     tibetanCalendar: String,
//     rating: RatingSchema,
//   },
//   { _id: false },
// );

// const DreamsSchema = new Schema(
//   {
//     title: String,
//     meaning: String,
//     rating: RatingSchema,
//   },
//   { _id: false },
// );

// const LifeAspectItemSchema = new Schema(
//   {
//     text: String,
//     rating: RatingSchema,
//   },
//   { _id: false },
// );

// const LifeAspectsSchema = new Schema(
//   {
//     newActivities: LifeAspectItemSchema,
//     decisionMaking: LifeAspectItemSchema,
//     business: LifeAspectItemSchema,
//     money: LifeAspectItemSchema,
//     realEstate: LifeAspectItemSchema,
//     trade: LifeAspectItemSchema,
//     legalMatters: LifeAspectItemSchema,
//     science: LifeAspectItemSchema,
//     art: LifeAspectItemSchema,
//     creativity: LifeAspectItemSchema,
//     learningExams: LifeAspectItemSchema,
//     communication: LifeAspectItemSchema,
//     confrontation: LifeAspectItemSchema,
//     bossCommunication: LifeAspectItemSchema,
//     jobChange: LifeAspectItemSchema,
//     travel: LifeAspectItemSchema,
//     movement: LifeAspectItemSchema,
//     rest: LifeAspectItemSchema,
//     physicalActivity: LifeAspectItemSchema,
//     housework: LifeAspectItemSchema,
//     marriage: LifeAspectItemSchema,
//     intimacy: LifeAspectItemSchema,
//     conception: LifeAspectItemSchema,
//   },
//   { _id: false },
// );

// const BirthOnThisDaySchema = new Schema(
//   {
//     title: String,
//     description: String,
//   },
//   { _id: false },
// );

// const HealthSchema = new Schema(
//   {
//     general: LifeAspectItemSchema,
//     vulnerableBodyPart: LifeAspectItemSchema,
//     medications: LifeAspectItemSchema,
//   },
//   { _id: false },
// );

// const SignsSchema = new Schema(
//   {
//     bad: [String],
//     good: [String],
//   },
//   { _id: false },
// );

// ----------------------
// ОСНОВНА СХЕМА DAY
// ----------------------

// const daySchema = new Schema({
//   dayNumber: Number,

//   phaseId: { type: Schema.Types.ObjectId, ref: 'Phase' },
//   phase: String,
//   phaseDescription: String,

//   qualities: [String],
//   generalMeaning: String,
//   warnings: [String],

//   dreams: DreamsSchema,
//   lifeAspects: LifeAspectsSchema,
//   birthOnThisDay: BirthOnThisDaySchema,

//   nutrition: LifeAspectItemSchema,
//   alcohol: LifeAspectItemSchema,
//   smoking: LifeAspectItemSchema,

//   health: HealthSchema,
//   haircut: HaircutSchema,

//   symbols: [String],
//   stones: [String],
//   meditations: [String],

//   signs: SignsSchema,

//   extendedMeaning: String,
// });

// export const Day = model('Days', daySchema);

import { Schema, model } from 'mongoose';

const daySchema = new Schema({
  dayNumber: { type: Number },

  // Вкладений об'єкт з посиланням на іншу колекцію
  phase: {
    phaseId: { type: Schema.Types.ObjectId, ref: 'Phase' },
    text: { type: String },
  },

  phaseDescription: { type: String },

  // Прості масиви рядків
  qualities: [String],
  generalMeaning: { type: String },
  warnings: [String],

  // Вкладені об'єкти
  dreams: {
    title: { type: String },
    meaning: { type: String },
    rating: {
      value: Number,
      scale: Number,
      meaning: String,
    },
  },

  // Великий вкладений об'єкт
  lifeAspects: {
    newActivities: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    decisionMaking: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    business: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    money: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    realEstate: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    trade: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    legalMatters: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    science: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    art: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    creativity: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    learningExams: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    communication: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    confrontation: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    bossCommunication: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    jobChange: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    travel: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    movement: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    rest: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    physicalActivity: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    housework: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    marriage: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    intimacy: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    conception: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
  },

  birthOnThisDay: {
    title: String,
    description: String,
    rating: {
      value: Number,
      scale: Number,
      meaning: String,
    },
  },

  health: {
    general: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    vulnerableBodyPart: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
    medications: {
      text: String,
      rating: {
        value: Number,
        scale: Number,
        meaning: String,
      },
    },
  },

  nutrition: {
    text: String,
    rating: {
      value: Number,
      scale: Number,
      meaning: String,
    },
  },
  alcohol: {
    text: String,
    rating: {
      value: Number,
      scale: Number,
      meaning: String,
    },
  },
  smoking: {
    text: String,
    rating: {
      value: Number,
      scale: Number,
      meaning: String,
    },
  },

  // Друге вкладене посилання
  haircut: {
    haircutId: { type: Schema.Types.ObjectId, ref: 'Haircut' },
    lunarCalendar: String,
    tibetanCalendar: String,
    rating: {
      value: Number,
      scale: Number,
      meaning: String,
    },
  },

  symbols: [String],
  stones: [String],
  meditations: [String],

  // Об'єкт, що містить масиви
  signs: {
    bad: [String],
    good: [String],
  },

  extendedMeaning: { type: String },
});

export const Day = model('Day', daySchema);

// import { Schema, model } from 'mongoose';

// const daySchema = new Schema({
//   dayNumber: { type: Number },
//   phase: {
//     phaseId: { type: Schema.Types.ObjectId, ref: 'Phase' },
//     text: { type: String },
//   },
//   phaseDescription: { type: String },
//   qualities: {
//     type: Array,
//     items: { type: String },
//   },
//   generalMeaning: { type: String },
//   warnings: {
//     type: Array,
//     items: { type: String },
//   },
//   dreams: {
//     type: Object,
//     properties: {
//       title: { type: String },
//       meaning: { type: String },
//     },
//   },
//   lifeAspects: {
//     type: Object,
//     properties: {
//       newActivities: { type: String },
//       decisionMaking: { type: String },
//       business: { type: String },
//       money: { type: String },
//       realEstate: { type: String },
//       trade: { type: String },
//       legalMatters: { type: String },
//       science: { type: String },
//       art: { type: String },
//       creativity: { type: String },
//       learningExams: { type: String },
//       communication: { type: String },
//       confrontation: { type: String },
//       bossCommunication: { type: String },
//       jobChange: { type: String },
//       travel: { type: String },
//       movement: { type: String },
//       rest: { type: String },
//       physicalActivity: { type: String },
//       housework: { type: String },
//       marriage: { type: String },
//       intimacy: { type: String },
//       conception: { type: String },
//     },
//   },
//   birthOnThisDay: {
//     type: Object,
//     properties: {
//       title: { type: String },
//       description: { type: String },
//     },
//   },
//   health: {
//     type: Object,
//     properties: {
//       general: { type: String },
//       vulnerableBodyPart: { type: String },
//       medications: { type: String },
//     },
//   },
//   nutrition: { type: String },
//   alcohol: { type: String },
//   smoking: { type: String },
//   haircut: {
//     haircutId: { type: Schema.Types.ObjectId, ref: 'Haircut' },
//     lunarCalendar: { type: String },
//     tibetanCalendar: { type: String },
//   },
//   symbols: {
//     type: Array,
//     items: { type: String },
//   },
//   stones: {
//     type: Array,
//     items: { type: String },
//   },
//   meditations: {
//     type: Array,
//     items: { type: String },
//   },
//   signs: {
//     type: Object,
//     properties: {
//       bad: {
//         type: Array,
//         items: { type: String },
//       },
//       good: {
//         type: Array,
//         items: { type: String },
//       },
//     },
//   },
//   extendedMeaning: {
//     type: String,
//     description:
//       'Довгий текстовий опис, який включає символіку, рекомендації, застереження та додаткові пояснення.',
//   },
// });

// export const Day = model('Day', daySchema);
