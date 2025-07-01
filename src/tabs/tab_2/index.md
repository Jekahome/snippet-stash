<style>
:root {
    --content-max-width: 97%;
}

/* Базовые сбросы и контейнеры */
html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

.container {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Навигация (если используется) */
.nav-chapters {
    min-width: 20px;
}

/* Стили таблицы */
.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px auto;
    table-layout: fixed;
}

.data-table col:nth-child(1) { width: 200px; }
.data-table col:nth-child(2) { width: 300px; }
.data-table col:nth-child(3) { width: 250px; }

/* Общие стили ячеек */
.data-table tr {
    height: auto; /* Автоматическая высота строки */
}

.data-table td, .data-table th {
    border: 1px solid #ccc;
    position: relative;
    padding: 0;
    vertical-align: top;
    background-color: #f9f9f9; /* Фон по умолчанию для всей ячейки */
    height: auto;
}

/* Стили заголовков */
.data-table th {
    background-color: #eeeeee;
    font-weight: bold;
    height: 50px; /* Фиксированная высота для заголовков */
}

/* Контейнер содержимого ячейки */
.data-table .cell-content {
    display: block;
    width: 100%;
    min-height: 40px;
    padding: 8px;
    box-sizing: border-box;
    background-color: transparent; /* Делаем внутренний div прозрачным */
    text-align: left;
    outline: none;
}

/* Редактируемые ячейки */
.data-table td .cell-content[contenteditable="true"] {
    background-color: #f9f9f9;
    word-wrap: break-word;
    overflow-wrap: anywhere;
}

.data-table td .cell-content[contenteditable="true"]:focus {
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0,123,255,0.5);
}

/* Панель управления */
.controls {
    text-align: center;
    margin: 20px;
}

.controls button {
    margin: 5px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.controls button:hover {
    background-color: #0056b3;
}

.file-input {
    margin: 10px;
}

/* Настройки таблицы */
.settings-trigger {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 10;
    border-radius: 0 0 0 8px;
}

.settings-trigger:hover {
    background-color: rgba(0,123,255,0.1);
}

.settings-menu {
    display: none;
    position: absolute;
    top: 20px;
    right: 2px;
    background: #fff;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 4px;
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 100;
    font-size: 12px;
}

.show-settings .settings-menu {
    display: flex;
    gap: 8px;
    align-items: center;
}

.settings-menu label {
    display: flex;
    align-items: center;
    gap: 4px;
}

.settings-menu input[type="number"],
.settings-menu select,
.settings-menu input[type="color"] {
    width: 50px;
    font-size: 12px;
}

/* Ресайзер колонок */
.column-resizer {
    position: absolute;
    top: 0;
    right: -2px;
    width: 4px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    z-index: 5;
}

.column-resizer:hover {
    background: rgba(0,123,255,0.3);
}

/* Стили для блоков кода */
.data-table .cell-content pre {
    margin: 0;
    padding: 0px;
    background:rgb(245, 245, 245);
    border-radius: 4px;
    overflow-x: auto;
}

.data-table .cell-content code {
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 0.9em;
}

#status {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background: rgba(0,0,0,0.7);
    color: white;
    border-radius: 5px;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.3s;
}

code {
    white-space: pre-wrap; /* Сохраняем переносы строк */
    overflow-x: auto;
}

/* Highlight.js переопределит эти стили */
.hljs {
    white-space: pre-wrap;
}

/* стили для модального окна */


        .current-text {
            background: #f9f9f9;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin: 20px 0;
            min-height: 50px;
        }

        .edit-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }

        .edit-btn:hover {
            background: #0056b3;
        }

        /* Модальное окно */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }

        .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }

        .text-editor {
            width: 100%;
            height: 200px;
            padding: 0px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
            resize: vertical;
        }

        .modal-footer {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 15px;
        }

        .save-btn {
            background: #28a745;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }

        .cancel-btn {
            background: #6c757d;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }

        .save-btn:hover {
            background: #218838;
        }

        .cancel-btn:hover {
            background: #5a6268;
        }


</style>
<div class="container">
    <div class="controls">
        <button id="saveSettingsBtn">Сохранить настройки в файл</button>
        <input type="password" id="token" placeholder="GitHub Token" />
    </div>
    <table class="data-table" id="dataTable">
        <colgroup>
            <col id="tab_2_col-0">
            <col id="tab_2_col-1">
            <col id="tab_2_col-2">
        </colgroup>
        <thead>
            <tr id="tab_2_header_row">
                <th id="tab_2_header_topic"><div class="cell-content" contenteditable="true">Тема</div></th>
                <th id="tab_2_header_content"><div class="cell-content" contenteditable="true">Описание</div></th>
                <th id="tab_2_header_other"><div class="cell-content" contenteditable="true">Доп. информация</div></th>
            </tr>
        </thead>
        <tbody>
            <tr id="tab_2_1">
                <td id="tab_2_1_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_1_topic.md')}}</div></td>
                <td id="tab_2_1_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_1_content.md')}}</div></td>
                <td id="tab_2_1_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_1_other.md')}}</div></td>
            </tr>
            <tr id="tab_2_2">
                <td id="tab_2_2_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_2_topic.md')}}</div></td>
                <td id="tab_2_2_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_2_content.md')}}</div></td>
                <td id="tab_2_2_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_2_other.md')}}</div></td>
            </tr>
            <tr id="tab_2_3">
                <td id="tab_2_3_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_3_topic.md')}}</div></td>
                <td id="tab_2_3_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_3_content.md')}}</div></td>
                <td id="tab_2_3_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_3_other.md')}}</div></td>
            </tr>
            <tr id="tab_2_4">
                <td id="tab_2_4_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_4_topic.md')}}</div></td>
                <td id="tab_2_4_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_4_content.md')}}</div></td>
                <td id="tab_2_4_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_4_other.md')}}</div></td>
            </tr>
            <tr id="tab_2_5">
                <td id="tab_2_5_topic"><div class="cell-content" contenteditable="true"></div></td>
                <td id="tab_2_5_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_5_content.md')}}</div></td>
                <td id="tab_2_5_other"><div class="cell-content" contenteditable="true"></div></td>
            </tr>         
        </tbody>
    </table>
    <div class="status" id="tab_2_status"></div>
</div>

<!-- Модальное окно -->
<div id="textModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Редактирование текста</h3>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <textarea id="textEditor" class="text-editor" placeholder="Введите ваш текст здесь..."></textarea>
        <div class="modal-footer">
            <button class="cancel-btn" onclick="closeModal()">Отмена</button>
            <button class="save-btn" onclick="saveText()">Сохранить</button>
        </div>
    </div>
</div>

 
<script>
    let editCellId=null;
    function closeModal() {
        const modal = document.getElementById('textModal');
        modal.classList.remove('show');
    }

    function saveText() {
        const editor = document.getElementById('textEditor');
        let cell = document.getElementById(editCellId);
        window.indexstore.content[currentTabId][cell.id] = editor.value;
        cell.innerHTML = '';
           
        const temp = document.createElement('div');
        temp.innerHTML = editor.value;
        
        const cellContentWrapper = document.createElement('div');
        cellContentWrapper.className = 'cell-content';
        cellContentWrapper.contentEditable = true;

        Array.from(temp.childNodes).forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'CODE') {
                const wrap_code = buildWrapper(node.cloneNode(true));

            
                cellContentWrapper.appendChild(wrap_code);
            } else {
                cellContentWrapper.appendChild(node.cloneNode(true));
            }
        });
       
        cell.appendChild(cellContentWrapper);

        setupCellSettingsMenu(cell);
       
        if (typeof hljs !== 'undefined') {
            //hljs.highlightAll();
            const codeElements = cell.querySelectorAll('code');
            codeElements.forEach(codeElement => {
                console.log(codeElement)
                hljs.highlightElement(codeElement);
            }); 
        }
        closeModal();
    }
    function buildWrapper(node_code){

        const contentWrapperPre = document.createElement('pre');
        contentWrapperPre.className = 'playground';


        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

            // Кнопка копирования
            const copyButton = document.createElement('button');
            copyButton.className = 'clip-button';
            copyButton.title = 'Copy to clipboard';
            copyButton.setAttribute('aria-label', 'Copy to clipboard');

            const tooltip = document.createElement('i');
            tooltip.className = 'tooltiptext';
            copyButton.appendChild(tooltip);

            // Кнопка запуска
            const runButton = document.createElement('button');
            runButton.className = 'fa fa-play play-button';
            runButton.hidden = true;
            runButton.title = 'Run this code';
            runButton.setAttribute('aria-label', 'Run this code');

        runButton.addEventListener('click', () => {
            run_rust_code(contentWrapperPre);
        });
 
        // Добавление кнопок в div
        buttonsDiv.appendChild(copyButton);
        buttonsDiv.appendChild(runButton);
        contentWrapperPre.appendChild(buttonsDiv);
        contentWrapperPre.appendChild(node_code); 
        return contentWrapperPre;
    }
    function fetch_with_timeout(url, options, timeout = 6000) {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
        ]);
    }
    function run_rust_code(code_block) {
        let result_block = code_block.querySelector('.result');
        if (!result_block) {
            result_block = document.createElement('code');
            result_block.className = 'result hljs language-bash';

            code_block.append(result_block);
        }

        const text = playground_text(code_block);
        const classes = code_block.querySelector('code').classList;
        let edition = '2015';
        classes.forEach(className => {
            if (className.startsWith('edition')) {
                edition = className.slice(7);
            }
        });
        const params = {
            version: 'stable',
            optimize: '0',
            code: text,
            edition: edition,
        };

        if (text.indexOf('#![feature') !== -1) {
            params.version = 'nightly';
        }

        result_block.innerText = 'Running...';

        fetch_with_timeout('https://play.rust-lang.org/evaluate.json', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(params),
        })
            .then(response => response.json())
            .then(response => {
                if (response.result.trim() === '') {
                    result_block.innerText = 'No output';
                    result_block.classList.add('result-no-output');
                } else {
                    result_block.innerText = response.result;
                    result_block.classList.remove('result-no-output');
                }
            })
            .catch(error => result_block.innerText = 'Playground Communication: ' + error.message);
    }

    function initCellFromIndexStore(cell){
        if (cell.tagName === 'TH' && !cell.querySelector('.cell-content')) {
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'cell-content';
            contentWrapper.contentEditable = true;
            contentWrapper.innerHTML = cell.innerHTML;
            cell.innerHTML = '';
            cell.appendChild(contentWrapper);
        }

        // Для ячеек с контентом
        if (cell.tagName === 'TD') {
            const contentWrapper = cell.querySelector('.cell-content') || cell;
            const cellId = cell.id;
            
            // Восстанавливаем контент из indexstore
            if (window.indexstore.content[currentTabId]?.[cellId] !== undefined) {
                contentWrapper.innerHTML = window.indexstore.content[currentTabId][cellId];
            }
        }
        
        // Создаем меню настроек...
        setupCellSettingsMenu(cell);
    }

    // Закрытие при клике вне окна
    window.onclick = function(event) {
        const modal = document.getElementById('textModal');
        if (event.target === modal) {
            closeModal();
        }
    }

    // Закрытие по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
</script>


<script>
const isGitHubPages = window.location.host.includes('github.io');
const basePath = isGitHubPages ? '/snippet-stash' : '';
const currentTabId = 'tab_2'; // Идентификатор текущей вкладки
let isUpdateSettings = false;
const owner = 'Jekahome';
const repo = 'snippet-stash';
const pathSettings = 'src/config/table-settings.json'; 
const branch = 'main';

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Инициализируем indexstore
        initIndexStore();
        
        // 2. Загружаем настройки из файла
        console.log('Загружаем настройки из файла');
        await loadSettingsFromFile();
        
        // 3. Применяем настройки и контент из indexstore
        initTableFromIndexStore();
        
        showFeedback("Таблица готова к работе");
    } catch (error) {
        console.error("Ошибка инициализации:", error);
        showFeedback("Ошибка загрузки таблицы", true);
    }
});

// 1. Инициализация indexstore как единого источника данных
function initIndexStore() {
    window.indexstore = window.indexstore || {
        settings: {}, // Настройки таблицы (размеры, цвета, шрифты)
        content: {}   // Содержимое ячеек
    };
    console.log('initIndexStore after [window.indexstore]:',window.indexstore);
    window.indexstore.settings[currentTabId] = window.indexstore.settings[currentTabId] || {};
    window.indexstore.content[currentTabId] = window.indexstore.content[currentTabId] || {};
    console.log('initIndexStore before [window.indexstore]:',window.indexstore);
}

// 2. Загрузка настроек из файла в indexstore
async function loadSettingsFromFile() {
    console.log('Loading settings from file to indexstore...');
    try {
        const response = await fetch(`${basePath}/config/table-settings.json`);
        if (!response.ok) throw new Error("Файл настроек не найден");
        
        const settingsText = await response.text();
        window.indexstore.settings = JSON.parse(settingsText);

        console.log('Settings loaded to indexstore');
        console.log('loadSettingsFromFile [window.indexstore.settings]:',window.indexstore.settings);
    } catch (error) {
        console.warn("Используются настройки по умолчанию:", error);
        initDefaultSettingsInIndexStore();
    }
}

// Настройки по умолчанию в indexstore
function initDefaultSettingsInIndexStore() {
    const defaultSettings = {
        columns: [
            { width: 200 },
            { width: 500 },
            { width: 50 }
        ],
        cells: {
            [`${currentTabId}_header_topic`]: {
                fontSize: "16px",
                backgroundColor: "black",
                contentType: "text",
                width: 200
            },
            [`${currentTabId}_header_content`]: {
                fontSize: "16px",
                backgroundColor: "#f0f0f0",
                contentType: "text",
                width: 300
            },
            [`${currentTabId}_header_other`]: {
                fontSize: "16px",
                backgroundColor: "#f0f0f0",
                contentType: "text",
                width: 250
            }
        }
    };
    
    window.indexstore.settings[currentTabId] = defaultSettings;
}

// 3. Инициализация таблицы из indexstore
function initTableFromIndexStore() {
    const cells = document.querySelectorAll('.data-table td, .data-table th');
    
    cells.forEach((cell) => {
        initCellFromIndexStore(cell);
    });

    // Настраиваем глобальный клик для закрытия меню
    setupGlobalClick();

    // Применяем настройки из indexstore
    applySettingsFromIndexStore();
}

// Применение настроек из indexstore
function applySettingsFromIndexStore() {
    const settings = window.indexstore.settings[currentTabId];
    if (!settings) return;
    
    // Применяем настройки колонок
    if (settings.columns) {
        settings.columns.forEach((col, index) => {
            if (col.width) {
                setColumnWidth(index, col.width);
            }
        });
    }
    
    // Применяем настройки ячеек
    if (settings.cells) { 
        Object.keys(settings.cells).forEach(cellId => {
            console.log(`applySettingsFromIndexStore cellId=${cellId}`);
            const cell = document.getElementById(cellId); 
            if (cell) {
                applyCellSettings(cell, settings.cells[cellId]);
            } else {
                console.warn('Элемент не найден:', cellId);
            }
        });
    }
}

// Сохранение данных из indexstore
document.getElementById('saveSettingsBtn').addEventListener('click', function() {
    console.log('Saving data from indexstore...');
    
    // Сохраняем данные из indexstore в файл репозитория
    saveToGitHub().then(() => {
        console.log('Data saved successfully from indexstore');
        //console.log('Current indexstore:', window.indexstore);
        showFeedback("Все данные сохранены");
    }).catch(error => {
        console.error('Save error:', error);
        showFeedback("Ошибка сохранения", true);
    });
});

// Настройка меню для ячейки
function setupCellSettingsMenu(cell) {
    const trigger = document.createElement('div');
    trigger.className = 'settings-trigger';

    const menu = document.createElement('div');
    menu.className = 'settings-menu';
    
    const isHeader = cell.tagName === 'TH';
    const columnIndex = cell.cellIndex;
    const contentWrapper = cell.querySelector('.cell-content');
    
    let menuHTML = `
        <label><button onclick="editContent('${cell.id}')">E</button></label>
        <label>F: <input type="number" class="font-size" value="14" min="8" max="24"></label>
        <label>B: <input type="color" class="bg-color" value="${rgbToHex(getComputedStyle(cell).backgroundColor) || '#f9f9f9'}"></label>
        <label>T:
            <select class="content-type">
                <option value="text">text</option>
                <option value="code">code</option>
                <option value="html">HTML</option>
            </select>
        </label>
    `;
    
    if (isHeader) {
        const currentWidth = getColumnWidth(columnIndex);
        menuHTML += `<label>W: <input type="number" class="column-width" value="${currentWidth}" min="50" max="800"></label>`;
    }
    
    menuHTML += `<label>H: <input type="number" class="row-height" placeholder="auto" min="30" max="1000"></label>`;

    menu.innerHTML = menuHTML;

    setupMenuEvents(cell, menu, contentWrapper);
    setupIconClick(cell, trigger);

    cell.appendChild(trigger);
    cell.appendChild(menu);
}

async function editContent(cell_id){
    try {
        editCellId = cell_id;
        const modal = document.getElementById('textModal');
        const editor = document.getElementById('textEditor');
         
        let markdownContent = '';
        if (!window.indexstore.content[currentTabId]?.[editCellId]) {
            const response = await fetch(`${basePath}/tabs/${currentTabId}/include/${cell_id}.md`);
            // Проверяем, что запрос был успешным
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
            }
            markdownContent = await response.text(); // Если ожидается текстовое содержимое (как для .md файлов)
        } else {
            markdownContent = window.indexstore.content[currentTabId][editCellId];
        }

        console.log(`Содержимое Markdown:`, markdownContent);

        editor.value = markdownContent;
        modal.classList.add('show');
        editor.focus();
    } catch (error) {
        console.error('Ошибка при загрузке Markdown файла:', error);
    }
}

// Настройка событий меню
function setupMenuEvents(cell, menu, contentWrapper) {
    menu.addEventListener('click', e => e.stopPropagation());
    
    const fontSizeInput = menu.querySelector('.font-size');
    fontSizeInput.addEventListener('input', e => {
        const value = `${e.target.value}px`;
        contentWrapper.style.fontSize = value;
        updateCellSettingsInIndexStore(cell, { fontSize: value });
        showFeedback(`Размер шрифта изменен на ${e.target.value}px`);
    });

    const bgColorInput = menu.querySelector('.bg-color');
    bgColorInput.addEventListener('input', e => {
        cell.style.backgroundColor = e.target.value;
        if (contentWrapper) contentWrapper.style.backgroundColor = 'transparent';
        updateCellSettingsInIndexStore(cell, { backgroundColor: e.target.value });
        showFeedback(`Цвет фона изменен`);
    });

    const contentTypeSelect = menu.querySelector('.content-type');
    if (contentTypeSelect) {
        contentTypeSelect.addEventListener('change', e => {
            updateCellSettingsInIndexStore(cell, { contentType: e.target.value });
            showFeedback(`Тип контента изменен на ${e.target.value}`);
        });
    }

    const columnWidthInput = menu.querySelector('.column-width');
    if (columnWidthInput && cell.tagName === 'TH') {
        columnWidthInput.addEventListener('input', e => {
            const width = parseInt(e.target.value);
            if (width >= 50) {
                setColumnWidth(cell.cellIndex, width);
                updateColumnSettingsInIndexStore(cell.cellIndex, { width });
                showFeedback(`Ширина колонки ${cell.cellIndex + 1} изменена на ${width}px`);
            }
        });
    }

    const rowHeightInput = menu.querySelector('.row-height');
    if (rowHeightInput) {
        rowHeightInput.addEventListener('input', e => {
            const height = parseInt(e.target.value);
            const row = cell.parentElement;
            
            if (height >= 30) {
                row.style.height = `${height}px`;
                row.style.minHeight = `${height}px`;
                row.dataset.fixedHeight = "true";
                showFeedback(`Высота строки установлена ${height}px`);
            } else if (e.target.value === '') {
                row.style.height = 'auto';
                row.style.minHeight = 'auto';
                delete row.dataset.fixedHeight;
                showFeedback(`Высота строки: автоматическая`);
            }
            
            updateCellSettingsInIndexStore(cell, { rowHeight: height >= 30 ? `${height}px` : 'auto' });
        });
    }

    menu.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('click', e => e.stopPropagation());
        el.addEventListener('focus', e => e.stopPropagation());
    });
}

// Настройка клика по иконке настроек
function setupIconClick(cell, trigger) {
    trigger.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.data-table td, .data-table th').forEach(c => {
            if (c !== cell) c.classList.remove('show-settings');
        });
        cell.classList.toggle('show-settings');
    });
}

// Обновление настроек ячейки в indexstore
function updateCellSettingsInIndexStore(cell, newSettings) {
    isUpdateSettings = true;
    const settings = window.indexstore.settings[currentTabId];
    if (!settings) return;
    
    const cellId = cell.id; 

    if (!settings.cells) settings.cells = {};
    settings.cells[cellId] = { ...(settings.cells[cellId] || {}), ...newSettings };
    
   // console.log('Updated cell settings in indexstore:', { cellId, newSettings });
}

// Обновление настроек колонки в indexstore
function updateColumnSettingsInIndexStore(columnIndex, newSettings) {
    isUpdateSettings = true;
    const settings = window.indexstore.settings[currentTabId];
    if (!settings) return;
    
    if (!settings.columns[columnIndex]) {
        settings.columns[columnIndex] = {};
    }
    
    settings.columns[columnIndex] = { ...settings.columns[columnIndex], ...newSettings };
    console.log('Updated column settings in indexstore:', { columnIndex, newSettings });
}

// Применение настроек к ячейке
function applyCellSettings(cell, settings) {
    const content = cell.querySelector('.cell-content') || cell;
    
    if (settings.fontSize) content.style.fontSize = settings.fontSize;
    if (settings.backgroundColor) {
        const contentDiv = cell.querySelector('.cell-content[contenteditable="true"]'); 
        if (contentDiv) {
            contentDiv.style.setProperty('background-color', settings.backgroundColor);
        }
    }
    
    if (settings.rowHeight && settings.rowHeight !== 'auto') {
        cell.parentElement.style.height = settings.rowHeight;
        cell.parentElement.dataset.fixedHeight = "true";
    }
    
    const menu = cell.querySelector('.settings-menu');
    if (menu) {
        menu.querySelector('.font-size').value = parseInt(settings.fontSize) || 14;
        if (settings.backgroundColor) {
            menu.querySelector('.bg-color').value = settings.backgroundColor;
        }
        
        const columnWidthInput = menu.querySelector('.column-width');
        if (columnWidthInput && settings.width) {
            columnWidthInput.value = settings.width;
        }
        
        const rowHeightInput = menu.querySelector('.row-height');
        if (rowHeightInput) {
            rowHeightInput.value = settings.rowHeight ? parseInt(settings.rowHeight) : '';
        }
        
        const contentTypeSelect = menu.querySelector('.content-type');
        if (contentTypeSelect && settings.contentType) {
            contentTypeSelect.value = settings.contentType;
        }
    }
}

// Утилитарные функции
function getCellType(cellIndex) {
    const types = ['topic', 'content', 'other'];
    return types[cellIndex] || cellIndex;
}

function getCleanCellContent(cellId) {
    const cell = document.getElementById(cellId);
    if (!cell) return '';
    
    const clone = cell.cloneNode(true);
    const menu = clone.querySelector('.settings-menu');
    if (menu) menu.remove();
    const trigger = clone.querySelector('.settings-trigger');
    if (trigger) trigger.remove();
    
    
    const pre = clone.querySelector('pre');
    const code = pre?.querySelector('code');

    if (!code) {
        return clone.textContent.trim();
    }

    const codeText = code.textContent || '';

    // Экранируем спецсимволы обратно (если нужно)
    const escaped = codeText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    let code_class = code.classList.length > 0 ? "class=\""+code.classList[0]+"\"" : "";
    let gt = '>';
    return  `<pre><code ${code_class}>${codeText}</code></pre${gt}`;
   
}

function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    const result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.?\d*)?\)$/i.exec(rgb);
    if (!result) return '#f9f9f9';
    const r = parseInt(result[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(result[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(result[3], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`.toLowerCase();
}

function getColumnWidth(columnIndex) {
    const col = document.getElementById(`${currentTabId}_col-${columnIndex}`);
    if (col && col.style.width) {
        return parseInt(col.style.width);
    }
    const defaultWidths = [200, 300, 250];
    return defaultWidths[columnIndex] || 150;
}

function setColumnWidth(columnIndex, width) {
    const col = document.getElementById(`${currentTabId}_col-${columnIndex}`);
    if (col) {
        col.style.width = `${width}px`;
    }
}

function setupGlobalClick() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.settings-menu') && !e.target.closest('.settings-trigger')) {
            document.querySelectorAll('.data-table td, .data-table th').forEach(c => {
                c.classList.remove('show-settings');
            });
        }
    });
}

function showFeedback(message, isError = false) {
    const status = document.getElementById(`${currentTabId}_status`);
    if (status) {
        status.textContent = message;
        status.style.color = isError ? 'red' : '#28a745';
        status.style.fontWeight = 'bold';
        
        setTimeout(() => {
            status.textContent = '';
        }, 2000);
    }
}

async function saveToGitHub() {
    
    if (Object.keys(window.indexstore.content).length == 0 && isUpdateSettings === false){
        console.warn("Данных нет");
        return;
    }
    const contentStore = window.indexstore.content;
    let files = [];

    if (isUpdateSettings === true){
        files.push({
            path: pathSettings,
            content: JSON.stringify(window.indexstore.settings, null, 2)
        });
    }

    if ( Object.keys(contentStore).length > 0) {
        for (const tabId in contentStore) {
            const tabContent = contentStore[tabId];

            if (tabContent && Object.keys(tabContent).length > 0) {
                for (const cellId in tabContent) {
                    files.push({
                        path: `src/tabs/${tabId}/include/${cellId}.md`,
                        content: tabContent[cellId] // JSON.stringify(tabContent[cellId], null, 2)
                    });  
                }
            } else {
                console.log(`tabId "${tabId}" пустой`);
            }
        }
    } else {
        console.log("indexstore.content пустой");
    }

    if (files.length == 0){
        console.warn("files рустой");
        return;
    }
    const token = prompt("Введите ваш GitHub токен:");
    //const token = document.getElementById('token').value.trim();
    
    if (!token) {
        console.error("Ошибка: Заполните поля GitHub token");
        return;
    }

    await commitMultipleFilesToGitHub({
        owner: owner,
        repo: repo,
        branch: branch,
        token: token, 
        commitMessage: 'Обновление нескольких файлов одним коммитом',
        files: files
    }); 

    console.info("Данные отправлены. Для работы с новыми данными дождитесь обновления репозитория");

    window.indexstore = window.indexstore || {
        settings: {},  
        content: {}  
    };
        
    setTimeout(() => {
        location.reload();  
    }, 35000);  
}

async function commitMultipleFilesToGitHub({ owner, repo, branch, token, files, commitMessage }) {
    const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
    };

    // Шаг 1: Получить SHA последнего коммита на ветке
    const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`, { headers });
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    // Шаг 2: Получить SHA дерева этого коммита
    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, { headers });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // Шаг 3: Создать новое дерево с новыми файлами
    const tree = files.map(({ path, content }) => ({
        path,
        mode: '100644',
        type: 'blob',
        content, // plain text; если у тебя бинарные — можно blob создать отдельно
    }));

    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            base_tree: baseTreeSha,
            tree,
        }),
    });
    const treeData = await treeRes.json();
    const newTreeSha = treeData.sha;

    // Шаг 4: Создать коммит с новым деревом
    const commitResNew = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            message: commitMessage,
            tree: newTreeSha,
            parents: [latestCommitSha],
        }),
    });
    const newCommitData = await commitResNew.json();
    const newCommitSha = newCommitData.sha;

    // Шаг 5: Обновить ссылку ветки на новый коммит
    const updateRefRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            sha: newCommitSha,
        }),
    });

    if (updateRefRes.ok) {
        console.log('✅ Успешно закоммичено!');
    } else {
        const err = await updateRefRes.json();
        console.error('Ошибка обновления ветки:', err.message || err);
    }
}

async function saveToGitHub_() {
    const token = prompt("Введите ваш GitHub токен:");
    //const token = document.getElementById('token').value.trim();
    
    if (!token) {
        console.error("Ошибка: Заполните поля GitHub token");
        return;
    }

    const file_settings = JSON.stringify(window.indexstore.settings, null, 2);
    console.log(`Вот что мы отсылаем:${file_settings}`);
    console.log(`И вот что мы отсылаем:${unescape(encodeURIComponent(file_settings))}`);

    // Получаем текущий SHA файла (если он уже существует)
    const sha = await getFileSha(owner,repo,pathSettings,token);
    console.log(`sha:${sha}`);

    // Отправляем файл
    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,  {
        method: 'PUT',
        headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Обновлено через GitHub API",
            content: btoa(unescape(encodeURIComponent(file_settings))), // base64 encode
            ...(sha ? { sha } : {}), // отправляем только если файл был,
            branch: branch
        })
    });

    if (putRes.ok) {
        console.log("Успешно сохранено!");
    } else {
        const err = await putRes.json();
        console.error("Ошибка: " + (err.message || "Неизвестная ошибка"));
    }
}

// GitHub требует SHA для обновления файла — это защита от конфликтов.
async function getFileSha(owner, repo, path, token) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`; 
    const response = await fetch(url, {
        headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
        }
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.sha;
}
</script>