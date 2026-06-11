function initializeBoard() {
  AppState.totalPairs = AppState.difficulty / 2;
  AppState.moves = 0;
  AppState.pairsFound = 0;
  AppState.firstCard = null;
  AppState.secondCard = null;
  AppState.currentStreak = 0;
  AppState.boardLocked = false;
  AppState.gameFinished = false;
  resetTimer();
  resetAchievements();

  const cardContents = getThemeCards(AppState.theme, AppState.totalPairs);
  const duplicatedCards = cardContents.flatMap((content, index) => [
    { id: index * 2, content, matched: false, flipped: false },
    { id: index * 2 + 1, content, matched: false, flipped: false }
  ]);

  AppState.cards = shuffleArray(duplicatedCards);
  UI.applyTheme(AppState.theme);
  UI.renderBoard(AppState.cards);
  UI.updateStatus();
}

function getCardById(cardId) {
  return AppState.cards.find((card) => String(card.id) === String(cardId));
}

function lockBoard() {
  AppState.boardLocked = true;
}

function unlockBoard() {
  AppState.boardLocked = false;
}

function allCardsMatched() {
  return AppState.pairsFound === AppState.totalPairs;
}