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

/* Стили таблицы - ОБНОВЛЕНО */
.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px auto;
    table-layout: fixed;
}

.data-table col:nth-child(1) { width: 200px; }
.data-table col:nth-child(2) { width: 300px; }
.data-table col:nth-child(3) { width: 250px; }

/* Общие стили ячеек - ОБНОВЛЕНО */
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

/* Контейнер содержимого ячейки - ОБНОВЛЕНО */
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
                <td id="tab_2_5_content"><div class="cell-content" contenteditable="true"></div></td>
                <td id="tab_2_5_other"><div class="cell-content" contenteditable="true"></div></td>
            </tr>         
        </tbody>
    </table>
    <div class="status" id="tab_2_status"></div>
</div>

<script>
// Глобальные переменные
const isGitHubPages = window.location.host.includes('github.io');
const basePath = isGitHubPages ? '/snippet-stash' : '';
const currentTabId = 'tab_2'; // Идентификатор текущей вкладки
const owner = 'Jekahome';
const repo = 'snippet-stash';
const path = 'src/config/table-settings.json'; 
const branch = 'main';

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Инициализируем indexstore
        initIndexStore();
        
        // 2. Загружаем настройки из файла ТОЛЬКО если их нет в indexstore
        if (!window.indexstore.settings[currentTabId]) {
            console.log('Загружаем настройки из файла ТОЛЬКО если их нет в indexstore');
            await loadSettingsFromFile();
        }
        
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
    
    if (!window.indexstore.settings[currentTabId]) {
        window.indexstore.settings[currentTabId] = {};
    }
    
    if (!window.indexstore.content[currentTabId]) {
        window.indexstore.content[currentTabId] = {};
    }
}

// 2. Загрузка настроек из файла в indexstore
async function loadSettingsFromFile() {
    console.log('Loading settings from file to indexstore...');
    try {
        const response = await fetch(`${basePath}/config/table-settings.json`);
        if (!response.ok) throw new Error("Файл настроек не найден");
        
        const settingsText = await response.text();
        // Сохраняем в indexstore
        window.indexstore.settings[currentTabId] = JSON.parse(settingsText);
        console.log('Settings loaded to indexstore');
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
            const cellId = getCellId(cell);
            
            // Восстанавливаем контент ИЗ indexstore
            if (window.indexstore.content[currentTabId]?.[cellId] !== undefined) {
                contentWrapper.innerHTML = window.indexstore.content[currentTabId][cellId];
            }
            
            // Обработчик изменений - сохраняем В indexstore
            contentWrapper.addEventListener('input', (e) => {
                updateContentInIndexStore(cellId, e.target.innerHTML);
            });
        }
        
        // Создаем меню настроек...
        setupCellSettingsMenu(cell);
    });

    // Настраиваем глобальный клик для закрытия меню
    setupGlobalClick();

    // Применяем настройки из indexstore
    applySettingsFromIndexStore();
}

// Обновление контента в indexstore
function updateContentInIndexStore(cellId, content) {
    window.indexstore.content[currentTabId][cellId] = content;
    console.log(`Content updated in indexstore for ${cellId}:`, content);
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
            const cell = document.getElementById(cellId); // БЕЗ replace!
            if (cell) {
                applyCellSettings(cell, settings.cells[cellId]);
            } else {
                console.warn('Элемент не найден:', cellId);
            }
        });
    }
}

// Обновление настроек ячейки в indexstore
function updateCellSettingsInIndexStore(cell, newSettings) {
    const settings = window.indexstore.settings[currentTabId];
    if (!settings) return;
    
    let cellId;
    const rowId = cell.parentElement.id.replace(`${currentTabId}_`, '');
    
    if (cell.tagName === 'TH') {
        cellId = `${currentTabId}_header_${getCellType(cell.cellIndex)}`;
    } else {
        cellId = `${currentTabId}_${rowId}_${getCellType(cell.cellIndex)}`;
    }
    
    if (!settings.cells) settings.cells = {};
    settings.cells[cellId] = { ...(settings.cells[cellId] || {}), ...newSettings };
    
    console.log('Updated cell settings in indexstore:', { cellId, newSettings });
}

// Сохранение данных из indexstore
document.getElementById('saveSettingsBtn').addEventListener('click', function() {
    console.log('Saving data from indexstore...');
    
    // Обновляем контент в indexstore из DOM (на случай если что-то не синхронизировалось)
    syncContentToIndexStore();
    
    // Сохраняем данные из indexstore в файл репозитория
    saveToGitHub().then(() => {
        console.log('Data saved successfully from indexstore');
        console.log('Current indexstore:', window.indexstore);
        showFeedback("Все данные сохранены");
    }).catch(error => {
        console.error('Save error:', error);
        showFeedback("Ошибка сохранения", true);
    });
});

// Синхронизация контента в indexstore из DOM
function syncContentToIndexStore() {
    document.querySelectorAll('.data-table td').forEach(td => {
        const cellId = getCellId(td);
        const cleanContent = getCleanCellContent(cellId);
        window.indexstore.content[currentTabId][cellId] = cleanContent;
    });
}

 
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

// Обновление настроек колонки В indexstore
function updateColumnSettingsInIndexStore(columnIndex, newSettings) {
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
    if (settings.backgroundColor) cell.style.backgroundColor = settings.backgroundColor;
    
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
function getCellId(cell) {
    const rowId = cell.parentElement.id.replace(`${currentTabId}_`, '');
    const cellType = getCellType(cell.cellIndex);
    return `${rowId}_${cellType}`;
}

function getCellType(cellIndex) {
    const types = ['topic', 'content', 'other'];
    return types[cellIndex] || cellIndex;
}

function getCleanCellContent(cellId) {
    const cell = document.getElementById(`${currentTabId}_${cellId}`);
    if (!cell) return '';
    
    const clone = cell.cloneNode(true);
    const menu = clone.querySelector('.settings-menu');
    if (menu) menu.remove();
    const trigger = clone.querySelector('.settings-trigger');
    if (trigger) trigger.remove();
    
    return clone.textContent.trim();
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

//-------------------------------------------------------------------
 
    async function saveToGitHub() {
        // const token = prompt("Введите ваш GitHub токен:");
        const token = document.getElementById('token').value.trim();
       
        if (!token) {
            console.error("Ошибка: Заполните поля GitHub token");
            return;
        }
         
        const file_settings = JSON.stringify(window.indexstore.settings, null, 2);

        // Получаем текущий SHA файла (если он уже существует)
        const sha = await getFileSha(owner,repo,path,token);
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