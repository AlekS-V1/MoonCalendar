import { Schema, model } from 'mongoose';

const ritualShema = new Schema({
  day: { type: Number },
  title: { type: String },
  energy_effect: { type: String },
  health_effect: { type: Array, items: { type: String } },
  material_effect: { type: Array, items: { type: String } },
  logic: { type: String },
  ritual_steps: { type: Array, items: { type: String } },
  recommended: { type: Array, items: { type: String } },
  forbidden: { type: Array, items: { type: String } },
});

export const Ritual = model('Ritual', ritualShema);
