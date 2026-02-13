export function extractText(obj) {
  let result = [];

  if (typeof obj === 'string') {
    result.push(obj);
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      result = result.concat(extractText(item));
    }
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      result = result.concat(extractText(obj[key]));
    }
  }

  return result;
}
