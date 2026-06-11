function initApp() {
  const modeSelect = document.getElementById('mode-select');
  const themeSelect = document.getElementById('theme-select');
  const difficultySelect = document.getElementById('difficulty-select');
  const player1Input = document.getElementById('player1-name');
  const player2Input = document.getElementById('player2-name');
  const startButton = document.getElementById('start-game-btn');
  const restartButton = document.getElementById('restart-btn');
  const exitButton = document.getElementById('exit-btn');
  const modalCloseButton = document.getElementById('modal-close-btn');
  const modalRestartButton = document.getElementById('modal-restart-btn');
  const gameBoard = document.getElementById('game-board');

  themeSelect.addEventListener('change', (event) => {
    AppState.theme = event.target.value;
    UI.applyTheme(AppState.theme);
  });

  modeSelect.addEventListener('change', (event) => {
    configureMode(event.target.value);
  });

  startButton.addEventListener('click', () => {
    AppState.theme = themeSelect.value;
    AppState.difficulty = Number(difficultySelect.value);
    updatePlayerNames(player1Input.value, player2Input.value);
    configureMode(modeSelect.value);
    initializeBoard();
    UI.showGameScreen();
    UI.updateStatus();
  });

  gameBoard.addEventListener('click', (event) => {
    const cardButton = event.target.closest('.card');
    if (!cardButton) return;
    handleCardSelection(cardButton.dataset.cardId);
  });

  restartButton.addEventListener('click', () => {
    resetToMenu();
  });

  exitButton.addEventListener('click', () => {
    resetToMenu();
  });

  modalCloseButton.addEventListener('click', () => {
    resetToMenu();
  });

  modalRestartButton.addEventListener('click', () => {
    initializeBoard();
    UI.showGameScreen();
    UI.updateStatus();
  });

  configureMode(modeSelect.value);
  UI.applyTheme(AppState.theme);
  UI.showMenu();

  window.addEventListener('resize', () => {
    if (!UI.gameScreen.classList.contains('hidden')) {
      UI.renderBoard(AppState.cards);
    }
  });
}

function resetToMenu() {
  AppState.gameFinished = true;
  stopTimer();
  UI.resetScreen();
  UI.showMenu();
}

document.addEventListener('DOMContentLoaded', initApp);