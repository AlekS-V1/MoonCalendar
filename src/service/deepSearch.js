import { extractText } from './extractText.js';
export function deepSearch(obj, targetKey, targetValue) {
  const results = [];

  function walk(node) {
    if (!node || typeof node !== 'object') return;

    for (const [key, value] of Object.entries(node)) {
      if (key === targetKey) {
        // Витягуємо весь текст із значення ключа
        const texts = extractText(value).map((t) => t.toLowerCase().trim());
        const val = targetValue.toLowerCase().trim();

        // Суворий збіг: хоча б один елемент має бути точно рівний
        if (texts.includes(val)) {
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
