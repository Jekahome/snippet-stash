 // IndexStorage - промежуточное хранилище
 let indexStorage = {
    meta: {
        title: 'Новый проект',
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        version: '1.0'
    },
    tableConfig: {
        columns: ['theme', 'description', 'additional'],
        columnWidths: ['250px', '1fr', '200px']
    },
    rows: []
};

// Типы контента
const CONTENT_TYPES = {
    TEXT: 'text',
    CODE: 'code',
    HTML: 'html',
    MARKDOWN: 'markdown'
};

// Поддерживаемые языки программирования
const SUPPORTED_LANGUAGES = [
    'javascript', 'python', 'rust', 'java', 'cpp', 'c', 'html', 'css', 
    'json', 'xml', 'sql', 'bash', 'yaml', 'php', 'go', 'typescript'
];

// Показать статус
function showStatus(message, type = 'info') {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type} show`;
    setTimeout(() => status.classList.remove('show'), 3000);
}

// Создание ячейки с типизированным контентом
function createCellElement(content, type = CONTENT_TYPES.TEXT, language = null) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.contentEditable = 'true';

    // Добавляем индикатор типа
    const indicator = document.createElement('div');
    indicator.className = 'cell-type-indicator';
    indicator.textContent = type.toUpperCase();
    cell.appendChild(indicator);

    if (type === CONTENT_TYPES.CODE && language) {
        cell.classList.add('code-cell');
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = `language-${language}`;
        
        // Безопасно устанавливаем текст (экранируем HTML)
        code.textContent = content;
        pre.appendChild(code);
        cell.appendChild(pre);
        
        // Безопасная подсветка синтаксиса
        try {
            hljs.highlightElement(code);
        } catch (error) {
            console.warn('Highlight.js error:', error);
            // Если подсветка не удалась, оставляем как есть
        }
    } else if (type === CONTENT_TYPES.HTML) {
        cell.classList.add('html-cell');
        // Для HTML контента используем textContent для безопасности
        cell.textContent = content;
    } else {
        cell.classList.add('text-cell');
        cell.textContent = content;
    }

    return cell;
}

// Генерация таблицы из indexStorage
function generateTable() {
    const gridTable = document.getElementById('gridTable');
    
    // Очищаем таблицу (кроме заголовков)
    const headers = Array.from(gridTable.querySelectorAll('.grid-header'));
    gridTable.innerHTML = '';
    headers.forEach(header => gridTable.appendChild(header));

    // Устанавливаем конфигурацию колонок
    if (indexStorage.tableConfig && indexStorage.tableConfig.columnWidths) {
        gridTable.style.gridTemplateColumns = indexStorage.tableConfig.columnWidths.join(' ');
    }

    // Генерируем строки
    indexStorage.rows.forEach(rowData => {
        rowData.cells.forEach(cellData => {
            const cell = createCellElement(
                cellData.content, 
                cellData.type || CONTENT_TYPES.TEXT, 
                cellData.language
            );
            
            // Применяем сохраненные стили
            if (cellData.styles) {
                Object.assign(cell.style, cellData.styles);
            }
            
            gridTable.appendChild(cell);
        });
    });

    // Подсвечиваем код после добавления всех элементов
    setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            try {
                // Проверяем, не подсвечен ли уже блок
                if (!block.classList.contains('hljs')) {
                    hljs.highlightElement(block);
                }
            } catch (error) {
                console.warn('Highlight error for block:', error);
            }
        });
    }, 100);

    attachEventListeners();
    showStatus('Таблица успешно сгенерирована', 'success');
}

// Сохранение данных в indexStorage
function saveToIndexStorage() {
    const cells = document.querySelectorAll('.grid-cell:not(.grid-header)');
    const rows = [];
    
    // Группируем ячейки по строкам
    const columnsCount = indexStorage.tableConfig.columns.length;
    for (let i = 0; i < cells.length; i += columnsCount) {
        const rowCells = [];
        
        for (let j = 0; j < columnsCount; j++) {
            const cell = cells[i + j];
            if (cell) {
                const indicator = cell.querySelector('.cell-type-indicator');
                const type = indicator ? indicator.textContent.toLowerCase() : CONTENT_TYPES.TEXT;
                
                let content = '';
                let language = null;
                
                if (type === CONTENT_TYPES.CODE) {
                    const code = cell.querySelector('code');
                    if (code) {
                        content = code.textContent;
                        const classes = code.className.match(/language-(\w+)/);
                        language = classes ? classes[1] : null;
                    }
                } else if (type === CONTENT_TYPES.HTML) {
                    // Для HTML безопасно получаем textContent
                    content = cell.textContent.replace(type.toUpperCase(), '').trim();
                } else {
                    content = cell.textContent.replace(type.toUpperCase(), '').trim();
                }
                
                rowCells.push({
                    content: content,
                    type: type,
                    language: language,
                    styles: {
                        width: cell.style.width,
                        height: cell.style.height
                    }
                });
            }
        }
        
        if (rowCells.length > 0) {
            rows.push({ cells: rowCells });
        }
    }
    
    indexStorage.rows = rows;
    indexStorage.meta.modified = new Date().toISOString();
}

// Сохранение проекта
function saveProject() {
    saveToIndexStorage();
    
    const blob = new Blob([JSON.stringify(indexStorage, null, 2)], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showStatus('Проект успешно сохранен', 'success');
}

// Загрузка проекта
function loadProject(projectData) {
    try {
        indexStorage = projectData;
        generateTable();
        showStatus('Проект успешно загружен', 'success');
    } catch (error) {
        showStatus('Ошибка загрузки проекта: ' + error.message, 'error');
    }
}

// Добавление новой строки
function addRow() {
    const gridTable = document.getElementById('gridTable');
    const columnsCount = indexStorage.tableConfig.columns.length;
    
    const newRowCells = [];
    for (let i = 0; i < columnsCount; i++) {
        const cell = createCellElement('', CONTENT_TYPES.TEXT);
        gridTable.appendChild(cell);
        newRowCells.push({
            content: '',
            type: CONTENT_TYPES.TEXT,
            language: null,
            styles: {}
        });
    }
    
    indexStorage.rows.push({ cells: newRowCells });
    attachEventListeners();
    showStatus('Добавлена новая строка', 'success');
}

// Очистка таблицы
function clearTable() {
    if (confirm('Очистить всю таблицу?')) {
        indexStorage.rows = [];
        generateTable();
        addRow(); // Добавляем одну пустую строку
        showStatus('Таблица очищена', 'info');
    }
}

// Генерация тестовых данных
function generateSampleData() {
    indexStorage.rows = [
        {
            cells: [
                { content: 'Rust функция', type: CONTENT_TYPES.TEXT, language: null, styles: {} },
                { 
                    content: 'fn fibonacci(n: u32) -> u32 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fibonacci(n - 1) + fibonacci(n - 2),\n    }\n}', 
                    type: CONTENT_TYPES.CODE, 
                    language: 'rust', 
                    styles: {} 
                },
                { content: 'Рекурсивная реализация', type: CONTENT_TYPES.TEXT, language: null, styles: {} }
            ]
        },
        {
            cells: [
                { content: 'JavaScript Promise', type: CONTENT_TYPES.TEXT, language: null, styles: {} },
                { 
                    content: 'const fetchData = async () => {\n  try {\n    const response = await fetch(\'/api/data\');\n    return await response.json();\n  } catch (error) {\n    console.error(error);\n  }\n};', 
                    type: CONTENT_TYPES.CODE, 
                    language: 'javascript', 
                    styles: {} 
                },
                { content: 'Async/await паттерн', type: CONTENT_TYPES.TEXT, language: null, styles: {} }
            ]
        },
        {
            cells: [
                { content: 'Python класс', type: CONTENT_TYPES.TEXT, language: null, styles: {} },
                { 
                    content: 'class DataProcessor:\n    def __init__(self, data):\n        self.data = data\n    \n    def process(self):\n        return [item.upper() for item in self.data]', 
                    type: CONTENT_TYPES.CODE, 
                    language: 'python', 
                    styles: {} 
                },
                { content: 'List comprehension', type: CONTENT_TYPES.TEXT, language: null, styles: {} }
            ]
        }
    ];
    
    generateTable();
    showStatus('Загружены тестовые данные', 'success');
}

// Подключение обработчиков событий
function attachEventListeners() {
    const cells = document.querySelectorAll('.grid-cell:not(.grid-header)');
    
    cells.forEach(cell => {
        // Автосохранение при изменении содержимого
        cell.addEventListener('input', () => {
            setTimeout(saveToIndexStorage, 500); // Задержка для производительности
        });
        
        // Обработка изменения размера
        const resizeObserver = new ResizeObserver(() => {
            setTimeout(saveToIndexStorage, 500);
        });
        resizeObserver.observe(cell);
    });
}

// Загрузка файла
document.getElementById('loadFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const projectData = JSON.parse(e.target.result);
                loadProject(projectData);
            } catch (error) {
                showStatus('Ошибка при загрузке файла: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    }
});

// Инициализация при загрузке страницы
window.addEventListener('load', function() {
    // Инициализируем highlight.js с безопасными настройками
    hljs.configure({
        ignoreUnescapedHTML: true, // Игнорируем предупреждения о неэкранированном HTML
        throwUnescapedHTML: false  // Не выбрасываем исключения
    });
    
    generateTable();
    addRow(); // Добавляем одну пустую строку для начала
});

// Автосохранение при закрытии страницы
window.addEventListener('beforeunload', function() {
    try {
        saveToIndexStorage();
    } catch (error) {
        console.warn('Autosave failed:', error);
    }
});

function highlightProject(){

    addCopyButtons();

    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            // Удаляем пометку, что элемент уже подсвечен
            delete block.dataset.highlighted;
            // Повторная подсветка
            hljs.highlightElement(block);
        });
    }
}

function addCopyButtons() {
    document.querySelectorAll("pre code").forEach((block) => {
      if (block.parentElement.querySelector(".copy-button")) return; // если уже есть — не добавлять
  
      const button = document.createElement("button");
      button.textContent = "📋";
      button.className = "copy-button";
      button.title = "Copy to clipboard";
      button.onclick = () => {
        navigator.clipboard.writeText(block.textContent);
        button.textContent = "✅";
        setTimeout(() => (button.textContent = "📋"), 1000);
      };
  
      block.parentElement.style.position = "relative";
      block.parentElement.appendChild(button);
    });
}
  