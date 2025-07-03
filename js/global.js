
// Основная инициализация
document.addEventListener('DOMContentLoaded', function() {
    setupKeyboardShortcuts();
    
    // Проверяем, загружена ли библиотека
    const checkHighlightJS = setInterval(() => {
        if (typeof hljs !== 'undefined') {
            clearInterval(checkHighlightJS);
            initHighlightJS();
        }
    }, 100);
});

// Дополнительная инициализация на случай поздней загрузки
window.addEventListener('load', function() {
    if (typeof hljs !== 'undefined' && !document.querySelector('code.hljs')) {
        initHighlightJS();
    }
});

// Обработчик клавиатуры
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // не даем mdBook обработать спец. keydown которые будут мешать вводить данные
        if ((e.key === 's' || e.key === 'S' || e.key === 'ы') && !e.ctrlKey && !e.metaKey) {
            console.log("тут пофиксил остановку поиска")
            e.stopImmediatePropagation();
        }
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.ctrlKey && !e.metaKey) {
            console.log("тут пофиксил переключение tabs")
            e.stopImmediatePropagation();
        }
        if (e.shiftKey && e.key === '?') {
            e.stopImmediatePropagation(); 
            // Не отменяем e.preventDefault(), чтобы символ ? вбился
        }
    }, true);
}

// Инициализация подсветки синтаксиса
function initHighlightJS() {
    // Ждем полной загрузки библиотеки
    if (typeof hljs === 'undefined') {
        console.warn('highlight.js not loaded yet');
        return;
    }

    // Настройки
    hljs.configure({
        ignoreUnescapedHTML: true,
        languages: ['rust', 'python', 'javascript', 'bash']
    });

    // Подсветка кода
    hljs.highlightAll();
    
    // Нумерация строк (если подключен плагин)
    if (typeof hljs.initLineNumbersOnLoad === 'function') {
        hljs.initLineNumbersOnLoad();
    }
}



