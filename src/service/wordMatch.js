export function containsWord(text, word) {
  if (!text || !word) return false;

  // Нормалізація: нижній регістр, видалення пунктуації
  const normalized = text
    .toLowerCase()
    .replace(/[^\p{L}\s]/gu, ' ') // залишає тільки букви та пробіли
    .replace(/\s+/g, ' ') // зайві пробіли
    .trim();

  const words = normalized.split(' ');

  return words.includes(word.toLowerCase());
}
