// cards.js - Geração e Manipulação de Cartas

async function updateGlobalLeaderboard() {
    const currentLevel = difficultySelect.value;
    leaderboardStatus.textContent = 'Carregando...';
    leaderboardList.innerHTML = '';
    
    const scores = await window.loadGlobalLeaderboard(currentLevel); 
    
    if (scores.length === 0) {
        leaderboardStatus.textContent = 'Sem pontuações globais para este nível.';
        return;
    }

    leaderboardStatus.textContent = '';
    scores.forEach((score, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>#${index + 1}. ${score.userName}</span>
            <span class="score-time">${formatTime(score.time)} (${score.attempts} tent.)</span>
        `;
        leaderboardList.appendChild(li);
    });
}
