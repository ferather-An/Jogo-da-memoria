🎮 Jogo da Memória Neon Extremo
Um jogo da memória moderno com tema neon, efeitos sonoros com Tone.js e integração com Firebase para placar global.

📁 Estrutura do Projeto
text
/project-root
│
├── 📄 index.html                    (HTML principal)
│
├── 📂 /css                          (Estilos CSS modulares)
│   ├── style.css                    (1.4 KB) - Estrutura base
│   ├── theme.css                    (1.1 KB) - Temas neon (azul, roxo, verde, rosa, laranja)
│   ├── animations.css               (1.9 KB) - Keyframes (flip, glow, shake, etc)
│   ├── cards.css                    (2.2 KB) - Estilo das cartas
│   └── stats.css                    (3.5 KB) - Componentes UI (botões, placar, etc)
│
├── 📂 /js                           (Scripts JavaScript modulares)
│   ├── firebase-init.js             (5.1 KB) - Inicialização Firebase + Auth + Firestore
│   ├── game.js                      (5.9 KB) - Lógica principal, temas, streak
│   ├── main.js                      (9.0 KB) - Inicialização do jogo + criação de cartas
│   ├── timer.js                     (0.9 KB) - Funções de timer e formatação de tempo
│   ├── sound.js                     (1.1 KB) - Tone.js + efeitos sonoros
│   ├── ui.js                        (0.2 KB) - Aplicação de temas visuais
│   ├── cards.js                     (1.1 KB) - Atualização do leaderboard global
│   ├── leaderboard-local.js         (1.1 KB) - Recordes em localStorage
│   ├── leaderboard-global.js        (0.5 KB) - Referência ao Firestore
│   └── streak.js                    (vazio)  - Integrado em game.js
│
├── 📂 /assets                       (Opcional: sons, imagens)
│   └── (sons, imagens, etc)
│
├── 🔧 .gitignore
├── 📝 package.json
└── 📖 README.md
🚀 Como Usar
1️⃣ Estrutura de Importações no HTML
CSS (no <head>)
xml
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/theme.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/cards.css">
<link rel="stylesheet" href="css/stats.css">
Bibliotecas Externas (no <head>)
xml
<!-- Tone.js para efeitos sonoros -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>

<!-- Firebase (type="module") -->
<script type="module" src="js/firebase-init.js"></script>
JavaScript (no final do <body> - ORDEM IMPORTA!)
xml
<!-- 1. Configuração e variáveis -->
<script src="js/game.js"></script>

<!-- 2. Funções utilitárias -->
<script src="js/timer.js"></script>
<script src="js/sound.js"></script>

<!-- 3. Interface -->
<script src="js/ui.js"></script>

<!-- 4. Manipulação de cartas -->
<script src="js/cards.js"></script>

<!-- 5. Recordes locais -->
<script src="js/leaderboard-local.js"></script>

<!-- 6. Recordes globais -->
<script src="js/leaderboard-global.js"></script>

<!-- 7. Inicialização (deve ser por último) -->
<script src="js/main.js"></script>
🎮 Funcionalidades
🎨 Temas Neon
🔵 Azul (padrão)

🟣 Roxo

🟢 Verde

🩷 Rosa

🟠 Laranja

📊 Níveis de Dificuldade
Fácil: 3x2 (6 cartas) - 3 pares

Médio: 4x3 (12 cartas) - 6 pares ⭐ padrão

Difícil: 5x4 (20 cartas) - 10 pares

Extremo: 8x5 (40 cartas) - 20 pares

Inferno: 10x8 (80 cartas) - 40 pares 🔥

⚡ Bônus e Power-Ups
Streak Bonus: +3 segundos a cada 3 acertos seguidos

Power-Up Card: Revela um par aleatório (aparece em dificuldades altas)

🏆 Placar
Recorde Local: Salvo em localStorage (tempo + tentativas)

Placar Global: Integrado com Firebase Firestore (top 10 por nível)

🔊 Efeitos Sonoros (Tone.js)
Flip: Nota C5

Match: Acorde maior (C5, E5, G5)

Error: Nota F#3 grave

Streak: Notas altas (G6, G7)

Power-Up: Acorde maior (E5, G5, C6)

Win: Acorde final (C5, E5, G5, C6)

⏱️ Timer
Conta regressiva do tempo decorrido

Bônus de tempo por streak

Formatação em MM:SS

📝 Arquivos CSS Detalhados
style.css
text
- Reset (*) e configuração geral
- Body com gradient background
- #game-container com flexbox
- Layout responsivo (mobile, tablet, desktop)
- Media queries
theme.css
text
- Variáveis CSS (--color-neon-*)
- Paletas de cores para cada tema
- Classes .theme-* para seleção dinâmica
animations.css
text
- @keyframes para todas as animações
- fadeInUp, glow, pulse, shake, flip, slideIn, bounce, etc.
- neonGlow, matchedFade, errorShake
cards.css
text
- Grid #board com display: grid
- .card com transform-style: preserve-3d (3D flip)
- .card.flipped, .card.matched, .card.error
- .card.power-up com estilo especial
- Responsividade para diferentes tamanhos
stats.css
text
- .stat-box para caixas de estatísticas
- #streak-bar e #streak-fill (barra de progresso)
- #leaderboard-list (placar)
- Botões e selects com hover effects
- #message-box (modal de vitória)
📝 Arquivos JavaScript Detalhados
firebase-init.js (type="module")
javascript
- Importação de Firebase SDK
- Inicialização de Auth (anônimo + custom token)
- Inicialização de Firestore
- window.loadGlobalLeaderboard(level) - Carrega top 10
- window.saveGlobalScore(level, time, attempts) - Salva score
- onAuthStateChanged - Listener de autenticação
game.js
javascript
- THEMES_CONFIG - Configurações de temas
- Variáveis globais (cards, flippedCards, matchedPairs, etc)
- updateStreak(isMatch) - Lógica de streak + bônus de tempo
- activatePowerUp(card) - Ativa power-up de dica
main.js
javascript
- shuffle(array) - Embaralha array
- createCard(type, value, index, gridColumns) - Cria elemento <div> carta
- handleCardClick(card) - Listener de clique
- checkMatch() - Verifica se par é válido
- showWinMessage() - Exibe modal de vitória
- startQuickView(cardsToFlip) - Modo "visão rápida" antes de começar
- window.initializeGame() - Inicializa o jogo (função principal)
timer.js
javascript
- formatTime(totalSeconds) - Converte segundos em MM:SS
- updateTimerDisplay() - Atualiza display do timer
- startTimer() - Inicia o cronômetro
- stopTimer() - Para o cronômetro
sound.js
javascript
- const synth - Tone.PolySynth configurado
- playSound(type) - Switch para diferentes tipos de som
- Tipos: 'flip', 'match', 'error', 'streak', 'powerup', 'win'
ui.js
javascript
- window.applyTheme() - Aplica classe CSS do tema (theme-*)
cards.js
javascript
- updateGlobalLeaderboard() - Carrega e exibe top 10 global
leaderboard-local.js
javascript
- const HIGH_SCORE_KEY - Chave do localStorage
- loadHighScores() - Carrega scores do localStorage
- updateHighScoreDisplay() - Atualiza display de recorde
- saveHighScore(level, time, finalAttempts) - Salva recorde local
leaderboard-global.js
javascript
- Referência às funções em firebase-init.js
- window.loadGlobalLeaderboard(level)
- window.saveGlobalScore(level, time, attempts)
🔌 Ordem de Carregamento (IMPORTANTE!)
CSS (no head)

style.css → theme.css → animations.css → cards.css → stats.css

Bibliotecas (no head)

Tone.js

Firebase (type="module")

HTML Body

Elementos DOM

JavaScript (antes de </body>)

game.js (variáveis e config)

timer.js (funções de tempo)

sound.js (áudio + refs DOM)

ui.js (temas)

cards.js (leaderboard global)

leaderboard-local.js (recordes locais)

leaderboard-global.js (referência)

main.js (ÚLTIMO - inicializa tudo)

🛠️ Configuração Firebase
Para usar o placar global, configure as variáveis de ambiente:

javascript
// Em firebase-init.js, adicionar:
const __app_id = "seu-app-id";
const __firebase_config = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    // ... outras configs
};
Ou use a Canvas API se estiver no Canvas LMS.

📱 Responsividade
Mobile (< 768px): Layout stack vertical, cards menores

Tablet (768px - 990px): Grid 2 colunas compactas

Desktop (> 990px): Layout lado a lado ideal

🎯 Como Estender
Adicionar novo tema:
css
/* Em theme.css */
.theme-cyan {
    --color-primary-neon: #00FFFF;
    --color-neon-success: #00FF00;
    --color-neon-error: #FF1493;
}
Adicionar novo nível:
javascript
// Em game.js - THEMES_CONFIG
'ultra': { 
    emojis: [...100 emojis...], 
    size: 200, 
    cols: 14, 
    name: "ULTRA (14x10)" 
}
Adicionar novo som:
javascript
// Em sound.js - playSound()
case 'custom':
    synth.triggerAttackRelease(["C5", "G5"], "8n");
    break;
🐛 Troubleshooting
Problema	Solução
Cartas não aparecem	Verificar se main.js está sendo carregado
Sons não funcionam	Confirmar que Tone.js está no CDN
Firebase não conecta	Verificar credenciais em firebase-init.js
Estilos não aplicam	Verificar ordem de CSS (theme.css após style.css)
Placar não salva	Verificar localStorage habilitado no navegador
📄 Licença
Desenvolvido por Ferather - GitHub

🎓 Aprendizados
Este projeto demonstra:

✅ Modularização de CSS e JavaScript

✅ CSS Grid para layout responsivo

✅ CSS Custom Properties (--color-*)

✅ CSS 3D Transforms (flip effect)

✅ Web Audio API com Tone.js

✅ Firebase Auth + Firestore

✅ localStorage para dados locais

✅ Event delegation com listeners

✅ Animações CSS avançadas

✅ Boas práticas de organização