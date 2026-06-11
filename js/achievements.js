const AchievementDefinitions = {
  firstPair: {
    id: 'firstPair',
    title: 'Poco a poco se logra',
    description: 'Encontraste el primer par de la partida.',
    condition: () => AppState.pairsFound === 1
  },
  hotStreak: {
    id: 'hotStreak',
    title: 'Enrachao',
    description: '3 pares seguidos sin fallar.',
    condition: () => AppState.currentStreak >= 3
  },
  firstTry: {
    id: 'firstTry',
    title: 'Cortita y al pie',
    description: 'Encontraste un par en el primer intento.',
    condition: () => AppState.moves === 1 && AppState.pairsFound === 1
  },
  flash: {
    id: 'flash',
    title: 'Despacio cerebrito',
    description: 'Completaste Fácil en menos de 30 segundos.',
    condition: () => AppState.mode === 'single' && AppState.difficulty === 16 && AppState.pairsFound === AppState.totalPairs && AppState.timerSeconds <= 30
  }
  ,
  velocista: {
    id: 'velocista',
    title: 'Velocista',
    description: 'Completaste Medio rápidamente (<= 90s).',
    condition: () => AppState.mode === 'single' && AppState.difficulty === 36 && AppState.pairsFound === AppState.totalPairs && AppState.timerSeconds > 0 && AppState.timerSeconds <= 90
  },
  perfection: {
    id: 'perfection',
    title: 'LOCURAAAAAAA',
    description: 'Completaste la partida sin fallos.',
    condition: () => AppState.pairsFound === AppState.totalPairs && AppState.moves === AppState.totalPairs
  },
  proplayer: {
    id: 'proplayer',
    title: 'Disculpame pues...',
    description: 'Superaste la dificultad mayor (8x8).',
    condition: () => AppState.difficulty === 64 && AppState.pairsFound === AppState.totalPairs
  },
  tryhard: {
    id: 'tryhard',
    title: 'BAJALE DOS TRYHARD',
    description: 'Promedio rápido: menos de 6s por pareja.',
    condition: () => AppState.pairsFound === AppState.totalPairs && AppState.timerSeconds > 0 && (AppState.timerSeconds / AppState.totalPairs) < 6
  }
};

function resetAchievements() {
  AppState.achievementsUnlocked.clear();
}

function evaluateAchievementsOnMatch() {
  unlockAchievement('firstPair');
  unlockAchievement('firstTry');
  unlockAchievement('hotStreak');
}

function evaluateAchievementsOnFinish() {
  unlockAchievement('flash');
  unlockAchievement('velocista');
  unlockAchievement('perfection');
  unlockAchievement('proplayer');
  unlockAchievement('tryhard');
}

function unlockAchievement(id) {
  const achievement = AchievementDefinitions[id];
  if (!achievement) return;
  if (AppState.achievementsUnlocked.has(id)) return;
  if (!achievement.condition()) return;
  AppState.achievementsUnlocked.add(id);
  UI.showAchievementToast(achievement.title, achievement.description);
}

function getUnlockedAchievements() {
  return Array.from(AppState.achievementsUnlocked).map((id) => AchievementDefinitions[id]);
}