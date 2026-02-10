import { Day } from '../models/day.js';
import createHttpError from 'http-errors';

export const getDays = async (req, res) => {
  const moonDay = await Day.find();
  res.status(200).json({ moonDay });
};

export const getDayId = async (req, res) => {
  const { dayId } = req.params;
  const moonDay = await Day.findById(dayId);

  if (!moonDay) {
    throw createHttpError(404, 'Day not found!');
    // return res.status(404).json({ message: 'Day not found' });
  }
  res.status(200).json(moonDay);
};
