import { Schema, model } from 'mongoose';

const magicShema = new Schema({
  day: { type: Number },
  energy_goal: { type: String },
  esoteric_logic: { type: String },
  materials: { type: Array, items: { type: String } },
  steps: { type: Array, items: { type: String } },
  optimal_time: { type: String },
  health_effects: { type: String },
  wealth_effects: { type: String },
  precautions: { type: String },
});

export const Magic = model('Okultpractic', magicShema);
