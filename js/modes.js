function configureMode(mode) {
  AppState.mode = mode;
  AppState.currentPlayer = 0;
  AppState.scores = [0, 0];
  AppState.currentStreak = 0;
  AppState.boardLocked = false;
  AppState.gameFinished = false;
  UI.showPlayer2Field(mode === 'pvp');
  UI.updateStatus();
}

function updatePlayerNames(name1, name2) {
  AppState.playerNames[0] = name1.trim() || 'Jugador 1';
  AppState.playerNames[1] = name2.trim() || 'Jugador 2';
}

function getActivePlayerName() {
  return AppState.playerNames[AppState.currentPlayer] || `Jugador ${AppState.currentPlayer + 1}`;
}

function switchTurnIfNeeded() {
  if (AppState.mode !== 'pvp') return;
  AppState.currentPlayer = AppState.currentPlayer === 0 ? 1 : 0;
  UI.updateTurnIndicator();
}