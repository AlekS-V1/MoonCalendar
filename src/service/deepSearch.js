import { extractText } from './extractText.js';
export function deepSearch(obj, targetKey, targetValue) {
  const results = [];
  const normalizedTarget = normalize(targetValue);

  function walk(node) {
    if (!node || typeof node !== 'object') return;

    for (const [key, value] of Object.entries(node)) {
      if (key === targetKey) {
        const texts = extractText(value).map((t) => normalize(t));

        if (texts.includes(normalizedTarget)) {
          results.push({ key, value });
        }
      }

      if (typeof value === 'object') {
        walk(value);
      }
    }
  }

  walk(obj);
  return results;
}

function normalize(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, '');
}
