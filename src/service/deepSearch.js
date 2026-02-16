export function deepSearch(obj, targetKey, targetValue) {
  const results = [];

  function walk(node) {
    if (!node || typeof node !== 'object') return;

    for (const [key, value] of Object.entries(node)) {
      // Перевіряємо саме пару ключ=значення
      if (key === targetKey) {
        // Порівнюємо значення як рядки (як у твоєму коді)
        if (String(value).toLowerCase().includes(targetValue.toLowerCase())) {
          results.push({ key, value });
        }
      }

      // Рекурсія
      if (typeof value === 'object') {
        walk(value);
      }
    }
  }

  walk(obj);
  return results;
}
