function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

function startTimer() {
  if (AppState.timerStarted) return;
  AppState.timerStarted = true;
  AppState.timerInterval = setInterval(() => {
    AppState.timerSeconds += 1;
    UI.updateTimer(formatTime(AppState.timerSeconds));
  }, 1000);
}

function stopTimer() {
  if (AppState.timerInterval) {
    clearInterval(AppState.timerInterval);
    AppState.timerInterval = null;
  }
  AppState.timerStarted = false;
}

function resetTimer() {
  stopTimer();
  AppState.timerSeconds = 0;
  UI.updateTimer(formatTime(0));
}