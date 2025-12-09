// ui.js - Interface do Usuário e Personalização

window.applyTheme = () => {
    const theme = themeSelect.value;
    gameContainer.className = '';
    gameContainer.classList.add(`theme-${theme}`);
};
