// timer.js - Funções de Timer e Tempo

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    if (gameStarted) {
        const currentRawTime = Math.floor((Date.now() - startTime) / 1000);
        elapsedTime = Math.max(0, currentRawTime - totalTimeAdjustment);
        timerDisplay.textContent = `Tempo: ${formatTime(elapsedTime)}`;
    }
}

function startTimer() {
    if (timer) clearInterval(timer);
    startTime = Date.now();
    totalTimeAdjustment = 0;
    timer = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}
