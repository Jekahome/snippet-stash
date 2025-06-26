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
                <td id="tab_2_1_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/1/topic.md')}}</div></td>
                <td id="tab_2_1_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/1/content.md')}}</div></td>
                <td id="tab_2_1_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/1/other.md')}}</div></td>
            </tr>
            <tr id="tab_2_2">
                <td id="tab_2_2_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/2/topic.md')}}</div></td>
                <td id="tab_2_2_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/2/content.md')}}</div></td>
                <td id="tab_2_2_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/2/other.md')}}</div></td>
            </tr>
            <tr id="tab_2_3">
                <td id="tab_2_3_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/3/topic.md')}}</div></td>
                <td id="tab_2_3_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/3/content.md')}}</div></td>
                <td id="tab_2_3_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/3/other.md')}}</div></td>
            </tr>
            <tr id="tab_2_4">
                <td id="tab_2_4_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/4/topic.md')}}</div></td>
                <td id="tab_2_4_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/4/content.md')}}</div></td>
                <td id="tab_2_4_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/4/other.md')}}</div></td>
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
let tableSettings = null;     // Хранилище настроек таблицы
let contentStore = {};       // Хранилище содержимого ячеек (ДОБАВЛЕНО)

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Загружаем настройки из файла
        await loadSettingsFromFile();
        
        // 2. Инициализируем хранилище контента (ДОБАВЛЕНО)
        initContentStore();
        
        // 3. Инициализируем таблицу
        initTableSettings();
        
        showFeedback("Таблица готова к работе");
    } catch (error) {
        console.error("Ошибка инициализации:", error);
        showFeedback("Ошибка загрузки таблицы", true);
    }
});

// Инициализация хранилища контента (НОВАЯ ФУНКЦИЯ)
function initContentStore() {
    contentStore = window.indexstore?.contentStore || {};
    if (!contentStore[currentTabId]) {
        contentStore[currentTabId] = {};
    }
}

// Функция инициализации таблицы с учетом идентификаторов вкладки
function initTableSettings() {
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
        
        // Добавляем обработчики для ячеек с контентом (ДОБАВЛЕНО)
        if (cell.tagName === 'TD') {
            const contentWrapper = cell.querySelector('.cell-content') || cell;
            const cellId = getCellId(cell);
            
            // Восстанавливаем сохраненный контент
            if (contentStore[currentTabId]?.[cellId] !== undefined) {
                contentWrapper.innerHTML = contentStore[currentTabId][cellId];
            }
            
            // Обработчик изменений
            contentWrapper.addEventListener('input', (e) => {
                updateCellContent(cell, e.target.innerHTML);
            });
        }
        
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
    });

    setupGlobalClick();
    applyCurrentSettings();
}

// Функция для получения чистого содержимого ячейки
function getCleanCellContent(cellId) {
    const cell = document.getElementById(`${currentTabId}_${cellId}`);
    if (!cell) return '';
    
    // Клонируем элемент, чтобы не повредить оригинал
    const clone = cell.cloneNode(true);
    
    // Удаляем меню настроек
    const menu = clone.querySelector('.settings-menu');
    if (menu) menu.remove();
    
    // Удаляем триггер настроек
    const trigger = clone.querySelector('.settings-trigger');
    if (trigger) trigger.remove();
    
    // Получаем чистый текст
    return clone.textContent.trim();
}

// Обновление содержимого ячейки  
function updateCellContent(cell, content) {
    const cellId = getCellId(cell);
    contentStore[currentTabId][cellId] = getCleanCellContent(cellId);
   
    console.log(`Content updated for ${cellId}:`, contentStore[currentTabId][cellId]);
    //console.log(document.getElementById(`${currentTabId}_${cellId}`).textContent);
}

 

// Получение ID ячейки  
function getCellId(cell) {
    const rowId = cell.parentElement.id.replace(`${currentTabId}_`, '');
    const cellType = getCellType(cell.cellIndex);
    return `${rowId}_${cellType}`;
}

// Определяем тип ячейки по индексу
function getCellType(cellIndex) {
    const types = ['topic', 'content', 'other'];
    return types[cellIndex] || cellIndex;
}

// Сохранение всех данных 
document.getElementById('saveSettingsBtn').addEventListener('click', function() {
    console.log('Save button clicked');
    // Обновляем contentStore перед сохранением
    Object.keys(contentStore[currentTabId]).forEach(cellId => {
        contentStore[currentTabId][cellId] = getCleanCellContent(cellId);
    });

    // Сохраняем в indexstore
    window.indexstore = window.indexstore || {};
    window.indexstore.contentStore = contentStore;
    
    saveSettingsToFile().then(() => {
        console.log('Settings saved successfully');
        console.log('Current content:', JSON.stringify(contentStore, null, 2));
        showFeedback("Все данные сохранены");
    }).catch(error => {
        console.error('Save error:', error);
        showFeedback("Ошибка сохранения", true);
    });
});

 

function applyCurrentSettings() {
    if (!tableSettings) return;

    try {
        const settings = JSON.parse(tableSettings);
        
        if (settings.columns) {
            settings.columns.forEach((col, index) => {
                if (col.width) {
                    setColumnWidth(index, col.width);
                }
            });
        }
        
        if (settings.cells) {
            document.querySelectorAll('.data-table th').forEach((th) => {
                const cellId = `${currentTabId}_header_${getCellType(th.cellIndex)}`;
                if (settings.cells[cellId]) {
                    applyCellSettings(th, settings.cells[cellId]);
                }
            });
            
            document.querySelectorAll('.data-table td').forEach((td) => {
                const rowId = td.parentElement.id.replace(`${currentTabId}_`, '');
                if (!rowId) return;
                
                const cellId = `${currentTabId}_${rowId}_${getCellType(td.cellIndex)}`;
                if (settings.cells[cellId]) {
                    applyCellSettings(td, settings.cells[cellId]);
                }
            });
        }
    } catch (error) {
        console.error("Ошибка применения настроек:", error);
    }
}

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

async function loadSettingsFromFile() {
    console.log('Loading settings from file...');
    try {
        const response = await fetch(`${basePath}/config/table-settings.json`);
        if (!response.ok) throw new Error("Файл настроек не найден");
        
        tableSettings = await response.text();
        console.log('Settings loaded');
    } catch (error) {
        console.warn("Используются настройки по умолчанию:", error);
        showFeedback("Ошибка загрузки настроек", true);
        initDefaultSettings();
    }
}

function initDefaultSettings() {
    const defaultSettings = {
        columns: [
            { width: 200 },
            { width: 300 },
            { width: 250 }
        ],
        cells: {
            [`${currentTabId}_header_topic`]: {
                fontSize: "16px",
                backgroundColor: "#f0f0f0",
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
    tableSettings = JSON.stringify(defaultSettings);
}

async function saveSettingsToFile() {
    try {
        const settings = {
            columns: [],
            cells: {}
        };
        
        for (let i = 0; i < 3; i++) {
            settings.columns.push({
                width: getColumnWidth(i)
            });
        }
        
        document.querySelectorAll('.data-table th').forEach((th) => {
            const cellType = getCellType(th.cellIndex);
            const cellId = `${currentTabId}_header_${cellType}`;
            
            const menu = th.querySelector('.settings-menu');
            if (menu) {
                settings.cells[cellId] = {
                    fontSize: th.querySelector('.cell-content').style.fontSize || "",
                    backgroundColor: th.style.backgroundColor || "",
                    rowHeight: th.parentElement.style.height || "auto",
                    contentType: menu.querySelector('.content-type').value || "text",
                    width: menu.querySelector('.column-width')?.value || null
                };
            }
        });
        
        document.querySelectorAll('.data-table td').forEach((td) => {
            const rowId = td.parentElement.id.replace(`${currentTabId}_`, '');
            const cellType = getCellType(td.cellIndex);
            const cellId = `${currentTabId}_${rowId}_${cellType}`;
            
            const menu = td.querySelector('.settings-menu');
            if (menu) {
                settings.cells[cellId] = {
                    fontSize: td.querySelector('.cell-content').style.fontSize || "",
                    backgroundColor: td.style.backgroundColor || "",
                    rowHeight: td.parentElement.style.height || "auto",
                    contentType: menu.querySelector('.content-type').value || "text"
                };
            }
        });
        
        tableSettings = JSON.stringify(settings);
        console.log("Настройки для сохранения:", tableSettings);

        const response = await fetch('/save-table-settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: tableSettings
        });
        
        if (!response.ok) throw new Error("Ошибка сохранения");
        
        showFeedback("Настройки сохранены");
    } catch (error) {
        console.error("Ошибка сохранения:", error);
        showFeedback("Ошибка сохранения", true);
    }
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

function setupMenuEvents(cell, menu, contentWrapper) {
    menu.addEventListener('click', e => e.stopPropagation());
    
    const fontSizeInput = menu.querySelector('.font-size');
    fontSizeInput.addEventListener('input', e => {
        const value = `${e.target.value}px`;
        contentWrapper.style.fontSize = value;
        updateCellSettings(cell, { fontSize: value });
        showFeedback(`Размер шрифта изменен на ${e.target.value}px`);
    });

    const bgColorInput = menu.querySelector('.bg-color');
    bgColorInput.addEventListener('input', e => {
        cell.style.backgroundColor = e.target.value;
        if (contentWrapper) contentWrapper.style.backgroundColor = 'transparent';
        updateCellSettings(cell, { backgroundColor: e.target.value });
        showFeedback(`Цвет фона изменен`);
    });

    const contentTypeSelect = menu.querySelector('.content-type');
    if (contentTypeSelect) {
        contentTypeSelect.addEventListener('change', e => {
            updateCellSettings(cell, { contentType: e.target.value });
            showFeedback(`Тип контента изменен на ${e.target.value}`);
        });
    }

    const columnWidthInput = menu.querySelector('.column-width');
    if (columnWidthInput && cell.tagName === 'TH') {
        columnWidthInput.addEventListener('input', e => {
            const width = parseInt(e.target.value);
            if (width >= 50) {
                setColumnWidth(cell.cellIndex, width);
                updateColumnSettings(cell.cellIndex, { width });
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
            
            updateCellSettings(cell, { rowHeight: height >= 30 ? `${height}px` : 'auto' });
        });
    }

    menu.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('click', e => e.stopPropagation());
        el.addEventListener('focus', e => e.stopPropagation());
    });
}

function updateCellSettings(cell, newSettings) {
    if (!tableSettings) initDefaultSettings();
    
    const settings = JSON.parse(tableSettings);
    
    let cellId;
    const rowId = cell.parentElement.id.replace(`${currentTabId}_`, '');
    
    if (cell.tagName === 'TH') {
        cellId = `${currentTabId}_header_${getCellType(cell.cellIndex)}`;
    } else {
        cellId = `${currentTabId}_${rowId}_${getCellType(cell.cellIndex)}`;
    }
    
    if (!settings.cells) settings.cells = {};
    settings.cells[cellId] = { ...(settings.cells[cellId] || {}), ...newSettings };
    tableSettings = JSON.stringify(settings);
    
    console.log('Updated cell settings:', { cellId, newSettings });
}

function updateColumnSettings(columnIndex, newSettings) {
    if (!tableSettings) initDefaultSettings();
    
    const settings = JSON.parse(tableSettings);
    if (!settings.columns[columnIndex]) {
        settings.columns[columnIndex] = {};
    }
    
    settings.columns[columnIndex] = { ...settings.columns[columnIndex], ...newSettings };
    tableSettings = JSON.stringify(settings);
}

function setupIconClick(cell, trigger) {
    trigger.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.data-table td, .data-table th').forEach(c => {
            if (c !== cell) c.classList.remove('show-settings');
        });
        cell.classList.toggle('show-settings');
    });
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
</script>