const AchievementDefinitions = {
  firstPair: {
    id: 'firstPair',
    title: 'Primer paso',
    description: 'Encontraste el primer par de la partida.',
    condition: () => AppState.pairsFound === 1
  },
  hotStreak: {
    id: 'hotStreak',
    title: 'Racha caliente',
    description: '3 pares seguidos sin fallar.',
    condition: () => AppState.currentStreak >= 3
  },
  sinTitubeos: {
    id: 'sinTitubeos',
    title: 'Sin titubeos',
    description: 'Encontraste un par en el primer intento.',
    condition: () => AppState.moves === 1 && AppState.pairsFound === 1
  },
  velocista: {
    id: 'velocista',
    title: 'Velocista',
    description: 'Completaste Fácil en menos de 30 segundos.',
    condition: () => AppState.mode === 'single' && AppState.difficulty === 16 && AppState.pairsFound === AppState.totalPairs && AppState.timerSeconds <= 30
  }
};

function resetAchievements() {
  AppState.achievementsUnlocked.clear();
}

function evaluateAchievementsOnMatch() {
  unlockAchievement('firstPair');
  unlockAchievement('sinTitubeos');
  unlockAchievement('hotStreak');
}

function evaluateAchievementsOnFinish() {
  unlockAchievement('velocista');
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