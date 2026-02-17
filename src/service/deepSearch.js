import { extractText } from './extractText.js';
export function deepSearch(obj, targetKey, targetValue) {
  const results = [];
  const normalizedTarget = normalize(targetValue);

  function walk(node) {
    if (!node || typeof node !== 'object') return;

    for (const [key, value] of Object.entries(node)) {
      if (key === targetKey) {
        console.log('FOUND KEY:', key, 'RAW VALUE:', value);

        const texts = extractText(value).map((t) => normalize(t));

        console.log('EXTRACTED TEXTS:', texts);
        console.log('TARGET:', normalizedTarget);

        if (texts.includes(normalizedTarget)) {
          console.log('STRICT MATCH SUCCESS');
          results.push({ key, value });
        } else {
          console.log('STRICT MATCH FAILED');
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
