import { Schema, model } from 'mongoose';

const haircutShema = new Schema({
  dayNumber: { type: Number },
  energy: { type: String },
  health: {
    type: Array,
    items: { type: String },
  },
  wealth: {
    type: Array,
    items: { type: String },
  },
  why: { type: String },
  avoid: {
    type: Array,
    items: { type: String },
  },
});

export const Haircut = model('Haircut', haircutShema);
