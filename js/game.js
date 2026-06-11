function handleCardSelection(cardId) {
  if (AppState.boardLocked || AppState.gameFinished) return;

  const card = getCardById(cardId);
  if (!card || card.matched || AppState.firstCard === card) return;

  card.flipped = true;
  UI.updateCardFlipped(card.id, true);

  if (!AppState.timerStarted && AppState.mode === 'single') {
    startTimer();
  }

  if (!AppState.firstCard) {
    AppState.firstCard = card;
    return;
  }

  AppState.secondCard = card;
  AppState.moves += 1;
  UI.updateStatus();
  lockBoard();

  if (AppState.firstCard.content === AppState.secondCard.content) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

function handleMatch() {
  AppState.firstCard.matched = true;
  AppState.secondCard.matched = true;
  AppState.pairsFound += 1;
  AppState.currentStreak += 1;

  if (AppState.mode === 'pvp') {
    AppState.scores[AppState.currentPlayer] += 1;
  }

  UI.updateCardFlipped(AppState.firstCard.id, true, true);
  UI.updateCardFlipped(AppState.secondCard.id, true, true);
  evaluateAchievementsOnMatch();

  AppState.firstCard = null;
  AppState.secondCard = null;
  unlockBoard();
  UI.updateStatus();

  if (allCardsMatched()) {
    finishGame();
  }
}

function handleMismatch() {
  AppState.currentStreak = 0;

  setTimeout(() => {
    if (AppState.firstCard) {
      AppState.firstCard.flipped = false;
      UI.updateCardFlipped(AppState.firstCard.id, false);
    }
    if (AppState.secondCard) {
      AppState.secondCard.flipped = false;
      UI.updateCardFlipped(AppState.secondCard.id, false);
    }

    AppState.firstCard = null;
    AppState.secondCard = null;
    switchTurnIfNeeded();
    unlockBoard();
    UI.updateStatus();
  }, 900);
}

function finishGame() {
  AppState.gameFinished = true;
  stopTimer();
  evaluateAchievementsOnFinish();
  UI.showEndModal();
}