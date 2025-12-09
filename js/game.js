// game.js - Lógica Principal do Jogo

const THEMES_CONFIG = {
    'easy': { emojis: ['🍎', '🍌', '🍇'], size: 6, cols: 3, name: "Fácil" },
    'classic': { emojis: ['❤️', '✨', '✅', '😂', '⭐', '🌼'], size: 12, cols: 4, name: "Médio" },
    'hard': { emojis: ['🚀', '👽', '🌌', '🔭', '🪐', '💫', '🌑', '🛰️', '🌠', '☄️'], size: 20, cols: 5, name: "Difícil" },
    'extreme': { emojis: ['👑', '💍', '💎', '💰', '🔑', '🔓', '⚙️', '🔗', '🛡️', '⚔️', '💡', '🔦', '🔥', '💧', '⚡', '⏳', '🧩', '🎨', '🎲', '🎺'], size: 40, cols: 8, name: "EXTREMO (8x5)" },
    'inferno': { 
        emojis: [
            '🍔', '🍕', '🌮', '🍣', '🍦', '🍩', '☕', '🍺', '🚗', '✈️',
            '🚢', '🚂', '🚲', '🛴', '🏠', '🏢', '🕌', '🏰', '🗿', '🗽',
            '💡', '⏰', '📱', '💻', '📷', '📽️', '📺', '🎧', '🎸', '🥁',
            '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯' 
        ],
        size: 80, 
        cols: 10, 
        name: "INFERNO (10x8)" 
    }
};

const QUICK_VIEW_DURATION = 1500; 
const POWER_UP_CHANCE = 0.05;
const POWER_UP_EMOJI = '⚡';
const POWER_UP_NAME = 'Relâmpago';

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let isChecking = false; 
let gameStarted = false;
let currentStreak = 0;

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let totalTimeAdjustment = 0;
let streakMax = 3;

function updateStreak(isMatch) {
    if (isMatch) {
        currentStreak++;
        playSound('match');
    } else {
        currentStreak = 0;
        playSound('error');
    }
    
    if (currentStreak >= streakMax && isMatch) {
        const bonusSeconds = 3; 
        totalTimeAdjustment += bonusSeconds;
        currentStreak = 0;
        
        playSound('streak');
        
        const feedbackMsg = document.createElement('div');
        feedbackMsg.textContent = `+${bonusSeconds}s BÔNUS DE SEQUÊNCIA!`;
        feedbackMsg.style.cssText = 'position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: var(--color-neon-success); font-weight: bold; font-size: 1.5rem; text-shadow: 0 0 5px var(--color-neon-success); animation: fadeOutUp 2s forwards; z-index: 100;';
        board.appendChild(feedbackMsg);
    }
    
    streakDisplay.textContent = `Sequência: ${currentStreak}`;
    streakFill.style.width = `${(currentStreak / streakMax) * 100}%`;
}

const style = document.createElement('style');
style.textContent = `@keyframes fadeOutUp { 0% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, -50px); } }`;
document.head.appendChild(style);

function activatePowerUp(card) {
    playSound('powerup');
    
    const unmatchedCards = Array.from(board.querySelectorAll('.card:not(.matched):not(.power-up)'));
    
    if (unmatchedCards.length >= 2) {
        const emojis = unmatchedCards.map(c => c.dataset.emoji);
        
        const uniqueEmojis = [...new Set(emojis)];
        const hintEmoji = uniqueEmojis[Math.floor(Math.random() * uniqueEmojis.length)];
        
        const hintPair = unmatchedCards.filter(c => c.dataset.value === hintEmoji);
        
        if (hintPair.length >= 2) {
            const cardA = hintPair[0];
            const cardB = hintPair[1];

            cardA.classList.add('flipped');
            cardB.classList.add('flipped');
            
            const feedbackMsg = document.createElement('div');
            feedbackMsg.textContent = `PAR REVELADO POR ${POWER_UP_NAME}!`;
            feedbackMsg.style.cssText = 'position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: #FFA500; font-weight: bold; font-size: 1.5rem; text-shadow: 0 0 5px #FFA500; animation: fadeOutUp 2s forwards; z-index: 100;';
            board.appendChild(feedbackMsg);

            setTimeout(() => {
                cardA.classList.remove('flipped');
                cardB.classList.remove('flipped');
            }, 1500); 
        }
    }
    
    card.classList.add('matched');
    card.classList.remove('power-up');
    matchedPairs++;
    const theme = THEMES_CONFIG[difficultySelect.value];
    matchesDisplay.textContent = `Pares: ${matchedPairs}/${theme.emojis.length}`;
    
    if (matchedPairs === theme.emojis.length) {
        stopTimer();
        gameStarted = false;
        setTimeout(showWinMessage, 500);
    }
}
