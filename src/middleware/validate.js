import createHttpError from 'http-errors';

export function validateParams(rules) {
  return function (req, res, next) {
    const errors = [];

    for (const key in rules) {
      const rule = rules[key];
      const value = req.query[key];

      // required
      if (
        rule.required &&
        (value === undefined || value === null || value === '')
      ) {
        errors.push(`${key} is required`);
        continue;
      }

      if (value === undefined) continue;

      // number
      if (rule.type === 'number') {
        const num = Number(value);
        if (isNaN(num)) {
          errors.push(`${key} must be a number`);
          continue;
        }
        if (rule.min !== undefined && num < rule.min) {
          errors.push(`${key} must be >= ${rule.min}`);
        }
        if (rule.max !== undefined && num > rule.max) {
          errors.push(`${key} must be <= ${rule.max}`);
        }
      }

      // string
      if (rule.type === 'string') {
        if (typeof value !== 'string') {
          errors.push(`${key} must be a string`);
          continue;
        }
        if (rule.enum && !rule.enum.includes(value)) {
          errors.push(`${key} must be one of: ${rule.enum.join(', ')}`);
        }
      }
    }

    if (errors.length > 0) {
      return next(createHttpError(400, { errors }));
    }

    next();
  };
}
