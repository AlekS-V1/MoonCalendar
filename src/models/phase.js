import { Schema, model } from 'mongoose';

const phaseShema = new Schema({
  phaseNumber: { type: Number },
  phase: { type: String },
  days: { type: String },
  energy: { type: String },
  description: { type: String },
  wellness_practices: {
    type: Array,
    items: { type: String },
  },
  nutrition: {
    type: Object,
    general: { type: String },
    preferred: {
      type: Array,
      items: { type: String },
    },
    cooling_balance: {
      type: Array,
      items: { type: String },
    },
    avoid_excess: {
      type: Array,
      items: { type: String },
    },
  },
});

export const Phase = model('Phase', phaseShema);
