// leaderboard-local.js - High Score Local (localStorage)

const HIGH_SCORE_KEY = 'memoryGameHighScores';

function loadHighScores() {
    try {
        const scores = JSON.parse(localStorage.getItem(HIGH_SCORE_KEY)) || {};
        return scores;
    } catch (e) {
        console.error("Erro ao carregar recordes (local):", e);
        return {};
    }
}

function updateHighScoreDisplay() {
    const currentLevel = difficultySelect.value;
    const scores = loadHighScores();
    const record = scores[currentLevel];
    
    if (record) {
        highScoreDisplay.innerHTML = `Recorde Local: <span style="font-weight: 700;">${formatTime(record.time)}</span> (${record.attempts} tent.)`;
    } else {
        highScoreDisplay.textContent = `Recorde Local: --:-- (0 tent.)`;
    }
}

function saveHighScore(level, time, finalAttempts) {
    const scores = loadHighScores();
    const currentRecord = scores[level];
    let isNewRecord = false;

    if (!currentRecord || time < currentRecord.time || (time === currentRecord.time && finalAttempts < currentRecord.attempts)) {
        scores[level] = { time: time, attempts: finalAttempts };
        isNewRecord = true;
    }
    
    try {
        localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
    } catch (e) {
        console.error("Erro ao salvar recorde (local):", e);
    }
    
    return isNewRecord;
}
