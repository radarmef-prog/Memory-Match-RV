const UI = {
  menuScreen: document.getElementById('menu-screen'),
  gameScreen: document.getElementById('game-screen'),
  boardElement: document.getElementById('game-board'),
  timerDisplay: document.getElementById('timer-display'),
  movesDisplay: document.getElementById('moves-display'),
  pairsDisplay: document.getElementById('pairs-display'),
  currentPlayerDisplay: document.getElementById('current-player-display'),
  turnIndicatorBox: document.getElementById('turn-indicator-box'),
  achievementToast: document.getElementById('achievement-toast'),
  toastTitle: document.getElementById('toast-title'),
  toastDesc: document.getElementById('toast-desc'),
  gameOverModal: document.getElementById('game-over-modal'),
  gameResults: document.getElementById('game-results'),
  unlockedAchievementsList: document.getElementById('unlocked-achievements-list'),
  player2Field: document.getElementById('player2-field'),
  appContainer: document.querySelector('.app-container')
};

UI.showMenu = function () {
  this.menuScreen.classList.remove('hidden');
  this.gameScreen.classList.add('hidden');
  this.gameOverModal.classList.add('hidden');
  this.boardElement.innerHTML = '';
  this.applyTheme(AppState.theme);
};

UI.showGameScreen = function () {
  this.menuScreen.classList.add('hidden');
  this.gameScreen.classList.remove('hidden');
  this.gameOverModal.classList.add('hidden');
  this.applyTheme(AppState.theme);
};

UI.applyTheme = function (themeKey) {
  document.body.classList.remove('theme-saints', 'theme-worldcup', 'theme-professors');
  const theme = ThemeCatalog[themeKey] || ThemeCatalog.saints;
  document.body.classList.add(theme.className);
  this.appContainer.dataset.theme = themeKey;
};

UI.renderBoard = function (cards) {
  this.boardElement.innerHTML = '';
  const columns = Math.sqrt(AppState.difficulty);
  const rows = columns;
  const maxBoardWidth = Math.min(window.innerWidth * 0.94, 1180);
  const maxBoardHeight = Math.max(window.innerHeight * 0.72, 360);
  const cardWidth = Math.floor(maxBoardWidth / columns);
  const cardHeight = Math.floor(maxBoardHeight / rows);
  const cardSize = Math.max(64, Math.min(120, cardWidth, cardHeight));

  this.boardElement.style.setProperty('--card-size', `${cardSize}px`);
  this.boardElement.style.gridTemplateColumns = `repeat(${columns}, minmax(${cardSize}px, 1fr))`;

  cards.forEach((card) => {
    const cardButton = document.createElement('button');
    cardButton.className = 'card';
    cardButton.type = 'button';
    cardButton.dataset.cardId = card.id;
    cardButton.setAttribute('aria-label', 'Carta del juego');

    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = '?';

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';

    const theme = ThemeCatalog[AppState.theme] || ThemeCatalog.saints;
    if (theme.imageFolder) {
      const image = document.createElement('img');
      image.src = encodeURI(`${theme.imageFolder}/${card.content}`);
      image.alt = `Carta de ${theme.name}`;
      image.loading = 'lazy';
      cardBack.appendChild(image);
    } else {
      // Si la carta no utiliza imágenes, se muestra el emoji/texto directamente.
      cardBack.textContent = card.content;
    }

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardButton.appendChild(cardInner);
    this.boardElement.appendChild(cardButton);
  });
};

UI.updateCardFlipped = function (cardId, flipped, matched = false) {
  const cardButton = this.boardElement.querySelector(`[data-card-id="${cardId}"]`);
  if (!cardButton) return;
  cardButton.classList.toggle('flipped', flipped);
  cardButton.classList.toggle('matched', matched);
};

UI.updateTimer = function (value) {
  this.timerDisplay.textContent = value;
};

UI.updateStatus = function () {
  this.movesDisplay.textContent = AppState.moves;
  this.pairsDisplay.textContent = `${AppState.pairsFound}/${AppState.totalPairs}`;

  const timerBox = document.getElementById('timer-status-box');
  if (AppState.mode === 'single') {
    this.turnIndicatorBox.classList.remove('hidden');
    this.currentPlayerDisplay.textContent = AppState.playerNames[0];
    timerBox.classList.remove('hidden');
  } else if (AppState.mode === 'pvp') {
    this.turnIndicatorBox.classList.remove('hidden');
    this.currentPlayerDisplay.textContent = AppState.playerNames[AppState.currentPlayer];
    timerBox.classList.add('hidden');
  } else {
    this.turnIndicatorBox.classList.add('hidden');
    timerBox.classList.add('hidden');
  }
};

UI.updateTurnIndicator = function () {
  if (AppState.mode !== 'pvp') return;
  this.currentPlayerDisplay.textContent = AppState.playerNames[AppState.currentPlayer];
  this.turnIndicatorBox.classList.toggle('active-turn', AppState.mode === 'pvp');
};

UI.showAchievementToast = function (title, description) {
  this.toastTitle.textContent = `¡${title}!`;
  this.toastDesc.textContent = description;
  this.achievementToast.classList.remove('hidden');
  this.achievementToast.classList.add('visible');
  setTimeout(() => {
    this.achievementToast.classList.remove('visible');
    this.achievementToast.classList.add('hidden');
  }, 2200);
};

UI.showEndModal = function () {
  this.gameOverModal.classList.remove('hidden');
  this.gameOverModal.classList.add('visible');

  const details = [];
  details.push(`<p><strong>Movimientos:</strong> ${AppState.moves}</p>`);
  details.push(`<p><strong>Parejas encontradas:</strong> ${AppState.pairsFound}/${AppState.totalPairs}</p>`);
  details.push(`<p><strong>Tasa de acierto:</strong> ${((AppState.pairsFound / AppState.moves) * 100).toFixed(0)}%</p>`);

  if (AppState.mode === 'single') {
    details.push(`<p><strong>Tiempo total:</strong> ${formatTime(AppState.timerSeconds)}</p>`);
  }

  if (AppState.mode === 'pvp') {
    details.push(`<p><strong>${AppState.playerNames[0]}:</strong> ${AppState.scores[0]} pares</p>`);
    details.push(`<p><strong>${AppState.playerNames[1]}:</strong> ${AppState.scores[1]} pares</p>`);
    if (AppState.scores[0] === AppState.scores[1]) {
      details.push('<p class="winner-text">El resultado es un empate.</p>');
    } else {
      const winner = AppState.scores[0] > AppState.scores[1] ? AppState.playerNames[0] : AppState.playerNames[1];
      details.push(`<p class="winner-text">Ganador: ${winner}</p>`);
    }
  }

  this.gameResults.innerHTML = details.join('');
  this.unlockedAchievementsList.innerHTML = '';

  const unlocked = getUnlockedAchievements();
  if (unlocked.length === 0) {
    this.unlockedAchievementsList.innerHTML = '<li>Sin logros desbloqueados.</li>';
  } else {
    unlocked.forEach((achievement) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${achievement.title}</strong>: ${achievement.description}`;
      this.unlockedAchievementsList.appendChild(li);
    });
  }
};

UI.resetScreen = function () {
  this.timerDisplay.textContent = '00:00';
  this.movesDisplay.textContent = '0';
  this.pairsDisplay.textContent = '0';
  this.currentPlayerDisplay.textContent = '-';
  this.boardElement.innerHTML = '';
};

UI.showPlayer2Field = function (show) {
  if (show) {
    this.player2Field.classList.remove('hidden');
  } else {
    this.player2Field.classList.add('hidden');
  }
};