
const isGitHubPages = window.location.host.includes('github.io');
const basePath = isGitHubPages ? '/snippet-stash' : '';
let currentTabId = null; 
let isUpdateSettings = false;
const owner = 'Jekahome';
const repo = 'snippet-stash';
const pathSettings = 'src/config/table-settings.json'; 
const branch = 'main';
let editCellId=null;
let isGlobalScriptReady = false;

// Основная инициализация
window.globalScriptReady = new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', async () => {

        await loadSettingsFromFile();
    
        if (!window.markdownit) {
            console.error('markdown-it не загружен');
            return;
        }
    
        window.md = window.markdownit({
            html: true,       // Разрешить HTML внутри markdown
            breaks: true,
        });
    
        setupKeyboardShortcuts();
        
        // Проверяем, загружена ли библиотека
        /*const checkHighlightJS = setInterval(() => {
            if (typeof hljs !== 'undefined') {
                clearInterval(checkHighlightJS);
                initHighlightJS();
            }
        }, 100);*/
        initHighlightJS();
        addButtonSave();
        console.log("global.js loaded");

        resolve();
    });
});

// Инициализация/получение хранилища
function getTabsStore() {
    return JSON.parse(localStorage.getItem('tabs')) || {
        settings: {},
        content: {}
    };
}

// Обновление хранилища
function updateTabsStore(updates) {
    const currentStore = getTabsStore();
    const newStore = { ...currentStore, ...updates };
    localStorage.setItem('tabs', JSON.stringify(newStore));
    return newStore;
}

function cleanStorage(){
    localStorage.setItem('tabs', JSON.stringify({}));
}

function addButtonSave(){
    let menuBar = document.getElementById("menu-bar");
 
    const button = document.createElement('button');
    button.className="right-buttons"
    button.id = 'saveSettingsBtn';
    button.textContent = 'Save';
    menuBar.appendChild(button);

    document.getElementById('saveSettingsBtn').addEventListener('click', function() {
        console.log('Saving data from indexstore...');
        // Сохраняем данные в файл репозитория
        saveToGitHub().then(() => {
            console.log('Data saved successfully from indexstore');
        }).catch(error => {
            console.error('Save error:', error);
        });
    });
}

async function loadSettingsFromFile() {
    try {

        const tabs = getTabsStore();
        if (tabs.settings) {
            return;
        }
        
        const response = await fetch(`${basePath}/config/table-settings.json`);
        if (!response.ok) throw new Error("Файл настроек не найден");
        
        const settingsText = await response.text();
        const loadedSettings = JSON.parse(settingsText);

        localStorage.setItem('tabs', JSON.stringify({
            settings: loadedSettings,
            content: tabs.content || {} 
        }));

    } catch (error) {
        console.warn("Используются настройки по умолчанию:", error);
        initDefaultSettingsInIndexStore();
    }
}

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
            e.stopImmediatePropagation();
        }
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.ctrlKey && !e.metaKey) {
            e.stopImmediatePropagation();
        }
        if (e.shiftKey && e.key === '?') {
            e.stopImmediatePropagation(); 
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

    hljs.configure({
        ignoreUnescapedHTML: true,
        languages: ['rust', 'python', 'javascript', 'bash']
    });

    hljs.highlightAll();
    
    // Нумерация строк (если подключен плагин)
    if (typeof hljs.initLineNumbersOnLoad === 'function') {
        hljs.initLineNumbersOnLoad();
    }
}

function closeModal() {
    const modal = document.getElementById('textModal');
    modal.classList.remove('show');
    editCellId=null;
}

function convertMarkdownCodeBlocksToHtml(text) {
    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    return text.replace(/```(\w+)\n([\s\S]*?)```/g, (match, lang, code) => {
        const escapedCode = escapeHtml(code);
        let gt = '>';
        return `<code class="language-${lang}">${escapedCode}</code${gt}`;
    });
}

function saveTextModal() {
    const editor = document.getElementById('modalTextEditor');
    let cell = document.getElementById(editCellId);
    const tabs = getTabsStore();
    tabs.content[currentTabId][cell.id] = editor.value;
    updateTabsStore({ content: tabs.content });
     
     
    cell.innerHTML = '';
        
    const temp = document.createElement('div');
    temp.innerHTML = convertMarkdownCodeBlocksToHtml(editor.value);  
    
    const cellContentWrapper = document.createElement('div');
    cellContentWrapper.className = 'cell-content';
    cellContentWrapper.contentEditable = true;

    Array.from(temp.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'CODE') {
            console.log('CODE=',node);
            const wrap_code = buildWrapper(node.cloneNode(true));

            cellContentWrapper.appendChild(wrap_code);
        }else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DETAILS') {
            console.log('DETAILS=',node);
            let node_details = node.cloneNode(true);
            const summaryEl = node_details.querySelector('summary');
            
            const newNodeDetails = document.createElement('details');
            newNodeDetails.appendChild(summaryEl.cloneNode(true));
            node_details.removeChild(summaryEl);
            const html = window.md.render(node_details.textContent);
            const fragment = document.createRange().createContextualFragment(html);
            newNodeDetails.appendChild(fragment);
            cellContentWrapper.appendChild(newNodeDetails);
        } else {
            console.log('ELSE=',node);
            // парсинг с помощью markdown-it
            const html = window.md.render(node.textContent);
            const fragment = document.createRange().createContextualFragment(html);
            cellContentWrapper.appendChild(fragment);

            // парсинг с помощью marked
            /* const markdown = node.textContent;
            if (markdown.length > 0) {
                const html = marked.parse(markdown);
                const fragment = document.createRange().createContextualFragment(html);
                cellContentWrapper.appendChild(fragment);
            }*/

            // без парсинга markdown 
            //cellContentWrapper.appendChild(node.cloneNode(true));
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

    buttonsDiv.appendChild(copyButton);
    buttonsDiv.appendChild(runButton);
    contentWrapperPre.appendChild(buttonsDiv);
    contentWrapperPre.appendChild(node_code); 
    return contentWrapperPre;
}
// Копия из book/book.js:23
function fetch_with_timeout(url, options, timeout = 6000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
    ]);
}
// Копия из book/book.js:105
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


// Инициализация при загрузке страницы
async function initTab(tab){
    currentTabId = tab;

    // 1. Инициализируем indexstore
    const tabs = getTabsStore();
    if (!tabs.settings[currentTabId]) {
        tabs.settings[currentTabId] = {};
    }
    if (!tabs.content[currentTabId]) {
        tabs.content[currentTabId] = {};
    }
    updateTabsStore(tabs);

    // 2. Применяем настройки и контент 
    initTableFromStore();
    console.log(`initTab ${tab}`);
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

function initDefaultSettingsInIndexStore() {
    const defaultSettings = {
        cells: {
            [`${currentTabId}_header_topic`]: {
                fontSize: "16px",
                backgroundColor: "#767676",
                contentType: "text",
                width: 75
            },
            [`${currentTabId}_header_content`]: {
                fontSize: "16px",
                backgroundColor: "#767676",
                contentType: "text",
                width: 200
            },
            [`${currentTabId}_header_other`]: {
                fontSize: "16px",
                backgroundColor: "#767676",
                contentType: "text",
                width: 25
            }
        }
    };
    
    const currentStore = getTabsStore();
    const updatedStore = {
        ...currentStore,
        settings: {
            ...currentStore.settings,
            [currentTabId]: defaultSettings
        }
    };
    updateTabsStore(updatedStore);
}

// 2. Инициализация таблицы 
function initTableFromStore() {
    const cells = document.querySelectorAll('.data-table td, .data-table th');
    
    cells.forEach((cell) => {
        initCellFromIndexStore(cell);
    });

    // Настраиваем глобальный клик для закрытия меню
    setupGlobalClick();

    // Применяем настройки  
    applySettingsFromStorage();
}

 

function initCellFromIndexStore(cell){

    // Для markdown table
    /*if (cell.tagName === 'TH' && !cell.querySelector('.cell-content')) {
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'cell-content';
        contentWrapper.contentEditable = true;
        contentWrapper.innerHTML = cell.innerHTML;
        cell.innerHTML = '';
        cell.appendChild(contentWrapper); 
    }*/

    // Для ячеек с контентом
    /*if (cell.tagName === 'TD') {
        const contentWrapper = cell.querySelector('.cell-content') || cell;
        const cellId = cell.id;
        
        // Восстанавливаем контент
        const store = getTabsStore(); 
        if (store.content?.[currentTabId]?.[cellId] !== undefined) {
            contentWrapper.innerHTML = store.content[currentTabId][cellId];
            console.log('!!!'); 
        }
    }*/
    
    // Создаем меню настроек...
    setupCellSettingsMenu(cell);
}

// Настройка меню для ячейки
function setupCellSettingsMenu(cell) {
    const trigger = document.createElement('div');
    trigger.className = 'settings-trigger';

    const menu = document.createElement('div');
    menu.className = 'settings-menu';
    
    const isHeader = cell.tagName === 'TH';
    const columnIndex = cell.cellIndex;
    
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
        const store = getTabsStore();
        const currentWidth = store.settings?.[currentTabId]?.cells?.[cell.id]?.width ?? 200;
        menuHTML += `<label>W: <input type="number" class="column-width" value="${currentWidth}" min="1" max="800"></label>`;
    }
    
    menuHTML += `<label>H: <input type="number" class="row-height" placeholder="auto" min="30" max="1000"></label>`;

    menu.innerHTML = menuHTML;

    setupMenuEvents(cell, menu);
    setupIconClick(cell, trigger);

    cell.appendChild(trigger);
    cell.appendChild(menu);
}

// Применение настроек  
function applySettingsFromStorage() {
    const tabs = getTabsStore();
    const settings = tabs.settings?.[currentTabId];
    
    if (!settings) return;
    
    // Применяем настройки ячеек
    if (settings.cells) {
        Object.keys(settings.cells).forEach(cellId => {
            const cell = document.getElementById(cellId);
            if (cell) {
                applyCellSettings(cell, settings.cells[cellId]);
            } else {
                console.warn('Элемент не найден:', cellId);
            }
        });
    }
}

async function editContent(cell_id) {
    try {
        editCellId = cell_id;
        const modal = document.getElementById('textModal');
        const editor = document.getElementById('modalTextEditor');
        
        const tabs = getTabsStore();
        let markdownContent = '';

        if (!tabs.content?.[currentTabId]?.[editCellId]) {
            const response = await fetch(`${basePath}/tabs/${currentTabId}/include/${cell_id}.md`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
            }
            markdownContent = await response.text();
            
            updateTabsStore({
                content: {
                    ...tabs.content,
                    [currentTabId]: {
                        ...(tabs.content?.[currentTabId] || {}),
                        [editCellId]: markdownContent
                    }
                }
            });
        } else {
            markdownContent = tabs.content[currentTabId][editCellId];
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
function setupMenuEvents(cell, menu) {
    menu.addEventListener('click', e => e.stopPropagation());
    
    const fontSizeInput = menu.querySelector('.font-size');
    fontSizeInput.addEventListener('input', e => {
        const value = `${e.target.value}px`;
        updateCellSettingsInLocalStore(cell, { fontSize: value });
        applyCellSettings(cell, { fontSize: value });
        console.log(`Размер шрифта изменен на ${e.target.value}px`);
    });

    const bgColorInput = menu.querySelector('.bg-color');
    bgColorInput.addEventListener('input', e => {
        updateCellSettingsInLocalStore(cell, { backgroundColor: e.target.value });
        applyCellSettings(cell, { backgroundColor: e.target.value });
        console.log(`Цвет фона изменен`);
    });

    const contentTypeSelect = menu.querySelector('.content-type');
    if (contentTypeSelect) {
        contentTypeSelect.addEventListener('change', e => {
            updateCellSettingsInLocalStore(cell, { contentType: e.target.value });
            console.log(`Тип контента изменен на ${e.target.value}`);
        });
    }

    const columnWidthInput = menu.querySelector('.column-width');
    if (columnWidthInput && cell.tagName === 'TH') {
        columnWidthInput.addEventListener('input', e => {
            const width = parseInt(e.target.value);
            if (width >= 1) {
                updateCellSettingsInLocalStore(cell, { width: width });
                applyCellSettings(cell, { width: width });
                console.log(`Ширина колонки ${cell.cellIndex + 1} изменена на ${width}px`);
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
                console.log(`Высота строки установлена ${height}px`);
            } else if (e.target.value === '') {
                row.style.height = 'auto';
                row.style.minHeight = 'auto';
                delete row.dataset.fixedHeight;
                console.log(`Высота строки: автоматическая`);
            }
            
            updateCellSettingsInLocalStore(cell, { rowHeight: height >= 30 ? `${height}px` : 'auto' });
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

// Обновление настроек ячейки
function updateCellSettingsInLocalStore(cell, newSettings) {
    isUpdateSettings = true;
    const store = getTabsStore();
    const settings = store.settings[currentTabId];
    if (!settings) return;

    if (!settings.cells) settings.cells = {};
    settings.cells[cell.id] = { ...(settings.cells[cell.id] || {}), ...newSettings };

    updateTabsStore({
        settings: {
            ...store.settings,
            [currentTabId]: settings
        }
    });
}

// Применение настроек к ячейке
function applyCellSettings(cell, settings) {
    
    if (settings.fontSize) {
       cell.style.setProperty('font-size', settings.fontSize);
    }

    if (settings.backgroundColor) {
        cell.style.setProperty('background-color', settings.backgroundColor);
    }

    if (settings.width) {
        cell.style.setProperty('width', `${settings.width}px`);
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

function getCellType(cellIndex) {
    const types = ['topic', 'content', 'other'];
    return types[cellIndex] || cellIndex;
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

function setupGlobalClick() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.settings-menu') && !e.target.closest('.settings-trigger')) {
            document.querySelectorAll('.data-table td, .data-table th').forEach(c => {
                c.classList.remove('show-settings');
            });
        }
    });
}

async function saveToGitHub() {
    const tabs = getTabsStore();

    if (Object.keys(tabs.content).length === 0 && isUpdateSettings === false) {
        console.warn("Данных нет");
        return;
    }

    let files = [];

    if (isUpdateSettings === true) {
        files.push({
            path: pathSettings,
            content: JSON.stringify(tabs.settings, null, 2)
        });
    }

    if (Object.keys(tabs.content).length > 0) {
        for (const tabId in tabs.content) {
            const tabContent = tabs.content[tabId];

            if (tabContent && Object.keys(tabContent).length > 0) {
                for (const cellId in tabContent) {
                    files.push({
                        path: `src/tabs/${tabId}/include/${cellId}.md`,
                        content: tabContent[cellId]
                    });
                }
            } else {
                console.log(`tabId "${tabId}" пустой`);
            }
        }
    } else {
        console.log("content пустой");
    }

    if (files.length === 0) {
        console.warn("files пустой");
        return;
    }

    const token = prompt("Введите ваш GitHub токен:");
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

    // Очистка isUpdateSettings и обновление localStorage
    isUpdateSettings = false;
    cleanStorage();

    setTimeout(() => {
        location.reload();
    }, 45000);
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
