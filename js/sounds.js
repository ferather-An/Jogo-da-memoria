// sound.js - Efeitos Sonoros com Tone.js

const board = document.getElementById('board');
const attemptsDisplay = document.getElementById('attempts');
const matchesDisplay = document.getElementById('matches');
const timerDisplay = document.getElementById('timer-display');
const highScoreDisplay = document.getElementById('high-score');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const restartButton = document.getElementById('restart-button');
const difficultySelect = document.getElementById('difficulty-select');
const themeSelect = document.getElementById('theme-select');
const streakDisplay = document.getElementById('streak-display');
const streakFill = document.getElementById('streak-fill');
const leaderboardList = document.getElementById('leaderboard-list');
const leaderboardStatus = document.getElementById('leaderboard-status');
const gameContainer = document.getElementById('game-container');

const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "square" },
    envelope: { release: 0.1, sustain: 0.1 }
}).toDestination();
synth.volume.value = -15;

const playSound = (type) => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
    switch(type) {
        case 'flip':
            synth.triggerAttackRelease("C5", "32n");
            break;
        case 'match':
            synth.triggerAttackRelease(["C5", "E5", "G5"], "8n");
            break;
        case 'error':
            synth.triggerAttackRelease("F#3", "16n");
            break;
        case 'streak':
            synth.triggerAttackRelease(["G6", "G7"], "8n");
            break;
        case 'powerup':
            synth.triggerAttackRelease(["E5", "G5", "C6"], "4n");
            break;
        case 'win':
            synth.triggerAttackRelease(["C5", "E5", "G5", "C6"], "2n");
            break;
    }
};
