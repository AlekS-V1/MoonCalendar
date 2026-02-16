export function deepSearch(obj, { key, value }) {
  const results = [];

  function walk(node) {
    if (!node || typeof node !== 'object') return;

    for (const [k, v] of Object.entries(node)) {
      let keyMatch = false;
      let valueMatch = false;

      // Порівняння ключа
      if (key && k === key) {
        keyMatch = true;
      }

      // Порівняння значення (рядки, числа, булеві)
      if (value) {
        if (
          typeof v === 'string' ||
          typeof v === 'number' ||
          typeof v === 'boolean'
        ) {
          if (String(v).toLowerCase().includes(value.toLowerCase())) {
            valueMatch = true;
          }
        }
      }

      // Якщо збіг по ключу або значенню — додаємо
      if (keyMatch || valueMatch) {
        results.push({ key: k, value: v });
      }

      // Рекурсія
      if (typeof v === 'object') {
        walk(v);
      }
    }
  }

  walk(obj);
  return results;
}
