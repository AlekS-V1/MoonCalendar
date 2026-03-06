export const formatMoonDay = (day, detail) => {
  if (!detail) return day;

  return {
    date: day.date,
    moonDay: day.moonDay,
    phase: day.phase,
    phaseName: day.phaseName,
    // Розгортаємо всі корисні поля з вашого об'єкта details
    details: {
      phase: detail.phase,
      phaseDescription: detail.phaseDescription,
      qualities: detail.qualities,
      generalMeaning: detail.generalMeaning,
      warnings: detail.warnings,
      symbols: detail.symbols,
      stones: detail.stones,
      meditations: detail.meditations,
      signs: detail.signs,
      extendedMeaning: detail.extendedMeaning,
      // Групуємо складні аспекти
      content: {
        dreams: detail.dreams,
        lifeAspects: detail.lifeAspects,
        birthOnThisDay: detail.birthOnThisDay,
        nutrition: detail.nutrition,
        health: detail.health,
        haircut: detail.haircut,
        lifestyle: {
          alcohol: detail.alcohol,
          smoking: detail.smoking,
        },
      },
    },
  };
};
