// main.js - Inicialização e Event Listeners

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function createCard(type, value, index, gridColumns) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.type = type;
    card.dataset.value = value;
    card.dataset.index = index;
    card.dataset.cols = gridColumns; 
    
    if (type === 'powerup') {
        card.classList.add('power-up');
        card.innerHTML = `
            <div class="card-content card-face">?</div>
            <div class="card-content card-back">${value}</div>
        `;
    } else {
        card.innerHTML = `
            <div class="card-content card-face">?</div>
            <div class="card-content card-back">${value}</div>
        `;
    }
    
    card.addEventListener('click', () => handleCardClick(card));
    return card;
}

function handleCardClick(card) {
    if (isChecking || !gameStarted || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    if (card.dataset.type === 'powerup') {
        card.classList.add('flipped');
        activatePowerUp(card);
        return; 
    }
    
    playSound('flip');
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        isChecking = true;
        attempts++;
        attemptsDisplay.textContent = `Tentativas: ${attempts}`;
        
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        const theme = THEMES_CONFIG[difficultySelect.value];
        matchesDisplay.textContent = `Pares: ${matchedPairs}/${theme.emojis.length}`;
        
        updateStreak(true);

        card1.classList.add('matched');
        card2.classList.add('matched');
        
        card1.classList.remove('error');
        card2.classList.remove('error');

        flippedCards = [];
        isChecking = false;

        if (matchedPairs === theme.emojis.length) {
            stopTimer();
            gameStarted = false;
            setTimeout(showWinMessage, 500);
        }

    } else {
        updateStreak(false);
        card1.classList.add('error');
        card2.classList.add('error');
        
        setTimeout(() => {
            card1.classList.remove('flipped', 'error');
            card2.classList.remove('flipped', 'error');
            flippedCards = [];
            isChecking = false;
        }, 1000); 
    }
}

function showWinMessage() {
    playSound('win');
    const finalTime = elapsedTime;
    const finalAttempts = attempts;
    const currentLevel = difficultySelect.value;
    const theme = THEMES_CONFIG[currentLevel];
    
    const isLocalRecord = saveHighScore(currentLevel, finalTime, finalAttempts);
    updateHighScoreDisplay(); 
    
    window.saveGlobalScore(currentLevel, finalTime, finalAttempts).then(() => {
        updateGlobalLeaderboard();
    });

    let messageContent = `
        <h2>🎉 Parabéns! Você Venceu! 🎉</h2>
        <p>Nível: <strong>${theme.name}</strong></p>
        <p>Tempo Final: <strong>${formatTime(finalTime)}</strong></p>
        <p>Tentativas: <strong>${finalAttempts}</strong></p>
    `;

    if (isLocalRecord) {
        messageContent += `<p style="color: var(--color-neon-blue); font-weight: bold; font-size: 1.5rem; text-shadow: 0 0 5px var(--color-neon-blue);">NOVO RECORDE LOCAL!</p>`;
    } else {
         const scores = loadHighScores();
         if (scores[currentLevel]) {
            messageContent += `<p>O recorde local é ${formatTime(scores[currentLevel].time)}.</p>`;
         }
    }
    
    messageContent += `<button onclick="window.hideMessage()">Jogar Novamente</button>`;

    messageText.innerHTML = messageContent;
    messageBox.classList.remove('hidden');
}

window.hideMessage = () => {
    messageBox.classList.add('hidden');
    initializeGame();
}

function startQuickView(cardsToFlip) {
    isChecking = true; 
    
    cardsToFlip.forEach(card => card.classList.add('flipped', 'busy'));
    
    setTimeout(() => {
        cardsToFlip.forEach(card => card.classList.remove('flipped', 'busy'));
        isChecking = false; 
        gameStarted = true;
        startTimer(); 
    }, QUICK_VIEW_DURATION);
}

window.initializeGame = (difficultyChanged = false, initialLoad = false) => {
    stopTimer(); 
    gameStarted = false;
    
    const currentLevel = difficultySelect.value;
    const themeConfig = THEMES_CONFIG[currentLevel];
    const uniqueEmojis = themeConfig.emojis;
    const totalCards = themeConfig.size;
    const gridColumns = themeConfig.cols;

    board.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    elapsedTime = 0;
    currentStreak = 0;
    isChecking = true; 
    totalTimeAdjustment = 0;

    attemptsDisplay.textContent = `Tentativas: 0`;
    matchesDisplay.textContent = `Pares: 0/${uniqueEmojis.length}`;
    timerDisplay.textContent = `Tempo: 00:00`;
    streakDisplay.textContent = `Sequência: 0`;
    streakFill.style.width = '0%';
    updateHighScoreDisplay();
    updateGlobalLeaderboard();

    board.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
    board.dataset.cols = gridColumns;

    let deck = [...uniqueEmojis, ...uniqueEmojis];

    if (Math.random() < POWER_UP_CHANCE && totalCards > 12) {
        const randomEmojiIndex = Math.floor(Math.random() * uniqueEmojis.length);
        const emojiToRemove = uniqueEmojis[randomEmojiIndex];
        deck = deck.filter(e => e !== emojiToRemove);
        
        deck.push(POWER_UP_EMOJI); 
        deck.pop();
    }

    shuffle(deck);

    const cardElements = [];
    
    cards = [];
    deck.forEach((value, index) => {
        const type = value === POWER_UP_EMOJI ? 'powerup' : 'emoji';
        const cardElement = createCard(type, value, index, gridColumns); 
        board.appendChild(cardElement);
        cardElements.push(cardElement);
        cards.push({ element: cardElement, type: type, value: value });
    });
    
    startQuickView(cardElements);
};
