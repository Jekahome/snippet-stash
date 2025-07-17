const isGitHubPages = window.location.host.includes('github.io');
const basePath =   isGitHubPages ? '/snippet-stash' : '';  
let currentTabId = null; 
let isUpdateSettings = false;
const owner = 'Jekahome';
const repo = 'snippet-stash';
const pathSettings = 'src/config/table-settings.json'; 
const branch = 'main';
let editCellId=null;
let isGlobalScriptReady = false;
let isReloadMermaid = false;

// Основная инициализация
window.globalScriptReady = new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', async () => {
        document.querySelectorAll("img").forEach((img) => {
            if (img.complete && img.naturalWidth === 0) {
                // Картинка уже загрузилась, но с ошибкой
                img.src = `${basePath}/config/img/coming-soon.gif`;
            } else {
                img.addEventListener("error", (e) => {
                    e.preventDefault(); 
                    img.src = `${basePath}/config/img/coming-soon.gif`;
                });
            }
        });
        
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            // Настройки размеров:
            flowchart: {
                useMaxWidth: false,    // true - ограничивает ширину, false - растягивается
                htmlLabels: true,      // использовать HTML-элементы для текста
                curve: 'basis',        // стиль кривых линий
                diagramPadding: 10,    // отступы вокруг диаграммы (px)
            },
            sequence: {
                diagramMarginX: 50,    // горизонтальные отступы (px)
                diagramMarginY: 10,    // вертикальные отступы (px)
                actorMargin: 50,       // отступ между участниками (px)
            },
            gantt: {
                barHeight: 20,         // высота строк (px)
                axisFormat: '%Y-%m-%d' // формат оси времени
            }
        });

        await storageLoadSettingsFromFile(basePath, currentTabId);
        
        //if (!window.markdownit) {console.error('markdown-it не загружен');return; }
        //window.md = window.markdownit({ html: true, breaks: true,});
         
        initHighlightJSv9_18_1();//initHighlightJS();
        
        addRunButtonsToPythonBlocks();
        
        /*const md_wasm = await import(`${basePath}/js/md_wasm.js`);
        await md_wasm.default();
        window.render_markdown = md_wasm.render_markdown;
        console.log("md_wasm.js loaded");*/

        // Объявляем render_markdown как функцию, которая лениво загружает md_wasm
        window.render_markdown = async function(...args) {
            if (!window._md_wasm_loaded) {  
                const md_wasm = await import(`${basePath}/js/md_wasm.js`);
                await md_wasm.default();
                window._md_wasm_loaded = true;  
                window.render_markdown = md_wasm.render_markdown; // Переопределяем функцию на настоящую
                console.log("md_wasm.js loaded (lazy)");
            }
            return window.render_markdown(...args);  
        };
 
        resolve();
    });
});

function resetStorage(){
    pathTabStore.drop();
    reloadWithCacheClear();
}

function resetTabStorage(){
    pathTabStore.dropTab(currentTabId);
    window.location.reload(true);
}

function addButtonResetStorage(){
    // Кнопка resetStorage
    const button_reset_storage = document.createElement('button');
    button_reset_storage.className="icon-button";
    button_reset_storage.type="button";
    button_reset_storage.id="button_reset_storage";
    button_reset_storage.title = "Undo session modifications";
    button_reset_storage.setAttribute('aria-label','Undo session modifications');
    button_reset_storage.setAttribute('aria-expanded','false');
    button_reset_storage.setAttribute('aria-controls','searchbar');
    button_reset_storage.innerHTML = '<i class="fa fa-undo"></i>'; 
    button_reset_storage.addEventListener('click', function(e) {
        e.preventDefault();
        resetStorage();
    });
   
    // Кнопка resetTabStorage
    const button_reset_tab_storage = document.createElement('button');
    button_reset_tab_storage.className="icon-button";
    button_reset_tab_storage.type="button";
    button_reset_tab_storage.id="button_reset_tab_storage";
    button_reset_tab_storage.title = "Undo TAB session modifications";
    button_reset_tab_storage.setAttribute('aria-label','Undo TAB session modifications');
    button_reset_tab_storage.setAttribute('aria-expanded','false');
    button_reset_tab_storage.setAttribute('aria-controls','searchbar');
    button_reset_tab_storage.innerHTML = '<i class="fa fa-exchange"></i>'; 
    button_reset_tab_storage.addEventListener('click', function(e) {
        e.preventDefault();
        resetTabStorage();
    });
    
    const menuBar = document.getElementById('menu-bar');
    if (menuBar) {
        const leftButtons = menuBar.querySelector('.right-buttons');
        if (leftButtons) {
            leftButtons.appendChild(button_reset_storage);
            leftButtons.appendChild(button_reset_tab_storage);
        } else {
            console.error('Элемент .right-buttons не найден');
        }
    } else {
        console.error('Элемент #menu-bar не найден');
    }
}

function addButtonSave(){
    const button = document.createElement('button');
    button.className="icon-button"
    button.id = 'saveSettingsBtn';
    button.title = "Save";
    button.setAttribute('aria-label','Save');
    button.innerHTML = '<i class="fa fa-save fa-lg"></i>';

    button.addEventListener('click', function(e) {
        e.preventDefault();
        saveToGitHub().then(() => {
            console.log('Data saved successfully');
        }).catch(error => {
            console.error('Save error:', error);
        });
    });

    const menuBar = document.getElementById('menu-bar');
    if (menuBar) {
        const leftButtons = menuBar.querySelector('.left-buttons');
        if (leftButtons) {
            leftButtons.appendChild(button);
        } else {
            console.error('Элемент .left-buttons не найден');
        }
    } else {
        console.error('Элемент #menu-bar не найден');
    }
 
    /*let menuBar = document.getElementById("menu-bar");
    const button = document.createElement('button');
    button.className="right-buttons"
    button.id = 'saveSettingsBtn';
    button.textContent = 'Save';
    menuBar.appendChild(button);
    document.getElementById('saveSettingsBtn').addEventListener('click', function() {
        saveToGitHub().then(() => {
            console.log('Data saved successfully');
        }).catch(error => {
            console.error('Save error:', error);
        });
    });*/
}
 
// Инициализация подсветки синтаксиса
/*function initHighlightJS() {
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
}*/

function initHighlightJSv9_18_1() {
    if (typeof hljs === 'undefined') {
        console.warn('highlight.js not loaded yet');
        return;
    }
    // Настройка языка вручную не обязательна, но можно оставить
    hljs.configure({
        languages: ['mermaid','rust', 'python', 'javascript', 'bash']
    });
    // Применяем подсветку вручную
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
    // Нумерация строк (если ты используешь highlightjs-line-numbers.js)
    if (typeof hljs.initLineNumbersOnLoad === 'function') {
        hljs.initLineNumbersOnLoad();
    }
}

function convertMarkdownCodeBlocksToHtml(text) {
    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    return text.replace(/```(\w+)\n([\s\S]*?)```/g, (match, lang, code) => {
        let gt = '>';
        if (lang == 'mermaid'){
            const escapedCode = escapeHtml(code);
            // по атрибуту 'data-reload-mermaid' будет пост обработка mermaid
            return `<div class="mermaid" data-reload-mermaid>${code}</div${gt}`;
        }else{
            const escapedCode = escapeHtml(code);
            return `<code class="language-${lang}">${escapedCode}</code${gt}`;
        }
    });
}

async function reloadMermaidDiagrams() {
    const diagrams = document.querySelectorAll('.mermaid[data-reload-mermaid]');
    if (diagrams.length === 0) {
      return;
    }
    let originalContent = "";
    for (const diagram of diagrams) {
      try {
        originalContent = diagram.textContent;
        diagram.innerHTML = '';
        // Восстанавливаем содержимое (это важно для Mermaid)
        diagram.textContent = originalContent;
        diagram.removeAttribute('data-reload-mermaid');
        await mermaid.init(undefined, [diagram]);
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!diagram.querySelector('svg')) {
                    reject(new Error('Mermaid не сгенерировал SVG'));
                } else {
                    resolve();
                }
            }, 100); 
        });
      } catch (error) {
        console.error('Error reloading Mermaid diagram:', error, diagram);
      }
    } 
}

function extractLanguage(classString) {
    console.log('extractLanguage=',classString)
    const match = classString.match(/language-([\w-]+)/);
    return match ? match[1] : null;
 }

async function convertNodeToHTML(node, cellContentWrapper) {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'CODE') {
        console.log(`CODE=`,node);

        const wrap_code = buildCodeWrapper(node.cloneNode(true), extractLanguage(node.className));
        cellContentWrapper.appendChild(wrap_code).cloneNode(true);              
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'PRE' && node.querySelector('code')) {
        const inner_node = node.querySelector('code').cloneNode(true);
        console.log(`PRE CODE=`,inner_node);
        const wrap_code = buildCodeWrapper(inner_node, extractLanguage(inner_node.className));
        cellContentWrapper.appendChild(wrap_code).cloneNode(true); 
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV' && node.classList.contains('mermaid')){
        isReloadMermaid = true;
        console.log(`MERMAID=`,node);
        cellContentWrapper.appendChild(node).cloneNode(true);
    }
    else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DETAILS') {
        console.log(`DETAILS=`,node);
        let node_details = node.cloneNode(true);
        const summaryEl = node_details.querySelector('summary');
        
        const newNodeDetails = document.createElement('details');
        newNodeDetails.appendChild(summaryEl.cloneNode(true));
        node_details.removeChild(summaryEl);
        //const html = window.md.render(node_details.textContent);
        const html = await render_markdown(node.textContent);
        const fragment = document.createRange().createContextualFragment(html);
        newNodeDetails.appendChild(fragment);
        cellContentWrapper.appendChild(newNodeDetails.cloneNode(true));
        
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') {
        console.log(`IMG=`,node);
        cellContentWrapper.appendChild(node.cloneNode(true));
    } else {
        // парсинг с помощью markdown-it
        // const html = window.md.render(node.textContent);
       
        console.log(`TEXT=`,node);
        const html = await render_markdown(node.textContent);
        const fragment = document.createRange().createContextualFragment(html);
        cellContentWrapper.appendChild(fragment.cloneNode(true));            
        
        // парсинг с помощью marked
        /* const markdown = node.textContent;
        if (markdown.length > 0) {
            const html = marked.parse(markdown);
            const fragment = document.createRange().createContextualFragment(html);
            cellContentWrapper.appendChild(fragment);
        }*/
    }
}

async function convertTextToHTML(cell, content, is_add_setting_menu=true){
    isReloadMermaid = false;

    cell.innerHTML = '';
    const temp = document.createElement('div');
    temp.innerHTML = content?convertMarkdownCodeBlocksToHtml(content):'';  
    const cellContentWrapper = document.createElement('div');
    cellContentWrapper.className = 'cell-content';
    cellContentWrapper.contentEditable = true;
    const nodes = Array.from(temp.childNodes);
    for (const node of nodes) {
        await convertNodeToHTML(node, cellContentWrapper);
    }
    cell.appendChild(cellContentWrapper); 
    if (is_add_setting_menu){setupCellSettingsMenu(cell);}
    if (isReloadMermaid) {
        await reloadMermaidDiagrams();
        isReloadMermaid = false;
    }

    /* 
        // highlight.js v11.9.0 
        if (typeof hljs !== 'undefined') {
            //hljs.highlightAll();
            const codeElements = cell.querySelectorAll('code');
            codeElements.forEach(codeElement => {
                hljs.highlightElement(codeElement);
            }); 
        }
    */
    // highlight.js v9.18.1
    if (typeof hljs !== 'undefined') {
        const codeElements = cell.querySelectorAll('code');
        codeElements.forEach(codeElement => {
            hljs.highlightBlock(codeElement);  
        }); 
    }
}

function closeModal() {
    const modal = document.getElementById('textModal');
    modal.classList.remove('show');
    editCellId=null;
}

function AddCodeBlockModal(language){
    const editor = document.getElementById('modalTextEditor');
    editor.value += `
    <pre><code class="language-${language}">
    ...
    </code></pre>`;
}

function AddBlockMermaidModal(){
    const editor = document.getElementById('modalTextEditor');
    editor.value +="\n\
    ```mermaid\n\
    graph TD\n\
        A --> B\n\
    ```\n\
    ";
}

function addHTMLModal() {
    if (document.getElementById('textModal')) {
        console.warn('Модальное окно уже существует');
        return;
    }
    const modalHTML = `
        <div id="textModal" class="modal">
            <div class="modal-content">
                <textarea id="modalTextEditor" class="modal-text-editor" placeholder="Введите ваш текст здесь..."></textarea>
                <div class="modal-footer">
                    <div class="modal-footer-left">           
                        <button class="icon-button rust-icon" title="Add Rust code block" onclick="AddCodeBlockModal('rust')">
                           <img src="${basePath}/config/img/rust-logo-blk.svg" alt="Rust" width="20" height="20">
                        </button>
                        <button class="icon-button python-icon" title="Add Python code block" onclick="AddCodeBlockModal('python')">
                           <img src="${basePath}/config/img/python_logo_icon.svg" alt="Python" width="20" height="20">
                        </button>
                        <button class="icon-button mermaid-icon" title="Add Mermaid block" onclick="AddBlockMermaidModal()">
                           <img src="${basePath}/config/img/mermaid.svg" alt="Mermaid" width="20" height="20">
                        </button>
                    </div>
                    <div class="modal-footer-right">
                        <button class="modal-cancel-btn" onclick="closeModal()">Отмена</button>
                        <button class="modal-save-btn" onclick="saveTextModal()">Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function addHTMLModalTab() {
    if (document.getElementById('textModalTab')) {
        console.wanr('Модальное окно уже существует');
        return;
    }
    const modalHTML = `
        <div id="textModalTab" class="modal">
            <div class="modal-content">
                <textarea id="modalTextEditorTab" class="modal-text-editor"></textarea>
                <div class="modal-footer">
                    <button class="modal-cancel-btn" onclick="closeModalTab()">Отмена</button>
                    <button class="modal-save-btn" onclick="saveTextModalTab()">Сохранить</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeModalTab(){
    const modal = document.getElementById('textModalTab');
    modal.classList.remove('show');
}

function saveTextModalTab(){
    const editor = document.getElementById('modalTextEditorTab');
    pathTabStore.set(`summary`, editor.value);
    closeModalTab();
}

async function loadContent(cell_id) {
    let markdown_content = pathTabStore.get(`content.${currentTabId}.${cell_id}`);
    if (!markdown_content || Object.keys(markdown_content).length === 0) {
        const cellElement = document.getElementById(cell_id);
        if (cellElement?.hasAttribute('data-new')) {
            pathTabStore.set(`content.${currentTabId}.${cell_id}`, '');
            console.warn('проверить корректность кода');
            markdown_content = '';
        } else {
            const response = await fetch(`${basePath}/tabs/${currentTabId}/include/${cell_id}.md`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
            }
            markdown_content = await response.text();
            pathTabStore.set(`content.${currentTabId}.${cell_id}`, markdown_content);
        }
    }
    return markdown_content;
}

async function editContent(cell_id) {
    try {
        editCellId = cell_id;
        const modal = document.getElementById('textModal');
        const editor = document.getElementById('modalTextEditor');
        document.getElementById(editCellId).classList.remove('show-settings');

        editor.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();  
                
                const start = this.selectionStart;
                const end = this.selectionEnd;
                const spaces = '    ';  
                
                // Вставляем пробелы в позицию курсора
                this.value = this.value.substring(0, start) + spaces + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + spaces.length;
            }
        });

        editor.addEventListener('wheel', function(e) {
            e.preventDefault(); 
            this.scrollTop += e.deltaY; // Скроллим содержимое textarea
        });
        let markdown_content = await loadContent(editCellId);
        if (!markdown_content || Object.keys(markdown_content).length === 0) {
            editor.value = '';
        }else{
          editor.value = markdown_content;  
        }
        modal.classList.add('show');
        editor.focus();
        editor.setSelectionRange(0, 0);
        editor.scrollTop = 0;
        // Дополнительная проверка для браузеров
        if (editor.createTextRange) {
            const range = editor.createTextRange();
            range.collapse(true);
            range.moveEnd('character', 0);
            range.moveStart('character', 0);
            range.select();
        }
    } catch (error) {
        console.error('Ошибка при загрузке Markdown файла:', error);
    }
}

async function saveTextModal() {
    const editor = document.getElementById('modalTextEditor');
    let cell = document.getElementById(editCellId);
    if (checkBacktickFormatting(editor.value) && await checkMermaidFormatting(editor.value)){
        await convertTextToHTML(cell, editor.value);
        pathTabStore.set(`content.${currentTabId}.${cell.id}`, editor.value);
        closeModal();        
    }
}

async function checkMermaidFormatting(value) {
    if(!value.includes('```mermaid')){
        return true;
    }

    const testNode = document.createElement('div');
    testNode.innerHTML = convertMarkdownCodeBlocksToHtml(value);
    testNode.style.position = 'absolute';
    testNode.style.visibility = 'hidden';
    document.body.appendChild(testNode);

    const diagrams = testNode.querySelectorAll('.mermaid[data-reload-mermaid]');
    if (diagrams.length === 0) {
        document.body.removeChild(testNode);
        return true;
    }

    for (const diagram of diagrams) {
        try {
          await mermaid.init(undefined, [diagram]);
          await new Promise((resolve, reject) => {
              setTimeout(() => {
                  if (!diagram.querySelector('svg')) {
                      reject(new Error('Mermaid failed to generate diagram'));
                  } else {
                      resolve();
                  }
              }, 100);
          });
  
        } catch (error) {
          console.error('checkMermaidFormatting error message:',error)
          alert('Invalid Mermaid diagram format. Please check browser developer console for details.')
          document.body.removeChild(testNode);
          return false;
        }
    }
    document.body.removeChild(testNode);
    return true;
}

function buildCodeWrapper(node_code, language){
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
            switch (language) {
                case "python":
                  hundlerExecutePython(contentWrapperPre);
                  break;
                case "rust":
                  run_rust_code(contentWrapperPre);
                  break;
                default:
                  console.log("Неизвестный язык");
            } 
        });
        // Кнопка отмены  
        /*const undoChangesButton = document.createElement('button');
        undoChangesButton.className = 'fa fa-history reset-button';
        undoChangesButton.setAttribute('title', 'Undo changes');
        undoChangesButton.setAttribute('aria-label', 'Undo changes');
        undoChangesButton.addEventListener('click', hundlerUndoChanges);*/

    buttonsDiv.appendChild(copyButton);
    buttonsDiv.appendChild(runButton);
    //buttonsDiv.appendChild(undoChangesButton);
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
async function initTab(tab) { 
    currentTabId = tab;
    // Запускаем функции, которые не зависят друг от друга, асинхронно
    await Promise.all([
        (async () => formatTitle(currentTabId))(),  
        (async () => {
            addHTMLModal(); 
            addHTMLModalTab(); 
            insertLockOverlay();
        })(),  
        (async () => {addEditButtonTab(); })(),  
        (async () => {addButtonSave(); addButtonResetStorage();})(),
        (async () => setupKeyboardShortcuts())()  
    ]);
     
    // Инициализируем settings и content, если их нет
    await initStorage(currentTabId);
    // Почистить удаленные TR
    checkDeleteTR();
    // Загружаем локальные данные новых TR
    await restoreNewTR();
    // Применяем настройки и контент 
    await initTableFromStore();
}

function checkDeleteTR(){
    const tabTrMap = pathTabStore.get(`delete_tr.${currentTabId}`);
    if (tabTrMap) { 
        for (const delete_tr_id in tabTrMap) {
            const element = document.getElementById(delete_tr_id);
            if (element) {
                element.remove();
            }
        }
    }
}

// Инициализация таблицы 
async function initTableFromStore() {
    const table = document.querySelector('.data-table');
    const rows = Array.from(table.rows); // только основная таблица
    const cells = rows.flatMap(row => Array.from(row.cells)); // без вложенных td и th 
    for (const cell of cells) {
        await restoreCellContent(cell);// Подгружаем обновленный контент
        setupCellSettingsMenu(cell);// Создаем меню настроек...
    }
    setupGlobalClick(); // Настраиваем глобальный клик для закрытия меню
    applySettingsFromStorage();// Применяем настройки  
}

async function restoreCellContent(cell) {
    const cell_content = pathTabStore.get(`content.${currentTabId}.${cell.id}`);
    if (cell_content !== undefined) {
        await convertTextToHTML(cell, cell_content, false);
    }
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
        <label><a class="btn btn-default" href="#" onclick="editContent('${cell.id}')" title="Edit content"><i class="fa fa-file fa-2x" aria-hidden="true"></i> </a></label>
        <label>F: <input type="number" class="font-size" value="14" title="Font size TR" min="8" max="24"></label>
        <label>B: <input type="color" class="bg-color" title="Background color TR" value="${rgbToHex(getComputedStyle(cell).backgroundColor) || '#f9f9f9'}"></label>  
    `;
    if (!isHeader) {
        menuHTML += `<label><a class="btn btn-default" href="#" onclick="DeleteTR('${cell.id}')" title="Delete TR"> <i class="fa fa-minus-square fa-2x" aria-hidden="true"></i> </a></label>
        <label><a class="btn btn-default" href="#" onclick="AddTRBefore('${cell.id}')" title="Add TR Before"><i class="fa fa-hand-o-up fa-2x" aria-hidden="true"></i></a></label>
        <label><a class="btn btn-default" href="#" onclick="AddTRAfter('${cell.id}')" title="Add TR After"><i class="fa fa-hand-o-down fa-2x" aria-hidden="true"></i></a></label>`;
    }

    if (isHeader) {
        const currentWidth = pathTabStore.get(`settings.${currentTabId}.${cell.id}.width`) ?? 200;
        menuHTML += `<label>W: <input type="number" class="column-width" title="Width TR" value="${currentWidth}" min="1" max="800"></label>`;
    }
    
    menuHTML += `<label>H: <input type="number" class="row-height" placeholder="auto" title="Height TR" min="30" max="1000"></label>`;
    // menuHTML += `<label>H: <input type="file" class="row-height" id="imageInput" accept="image/*"></label>`;
    menuHTML += `<label for="image_${cell.id}" class="modern-file-button" title="Upload Image">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg></label>
        <input type="file" id="image_${cell.id}" accept="image/*" hidden onchange="uploadImage('${cell.id}', this.files[0])">`;

    menu.innerHTML = menuHTML;

    setupMenuEvents(cell, menu);
    setupIconClick(cell, trigger);

    cell.appendChild(trigger);
    cell.appendChild(menu);
}

// Применение настроек  
function applySettingsFromStorage() {
    const cellSettings = pathTabStore.get(`settings.${currentTabId}`);
    if (!cellSettings) return;
    Object.entries(cellSettings).forEach(([cellId, config]) => {
        const cell = document.getElementById(cellId);
        if (cell) {
            applyCellSettings(cell, config);
        } else {
            console.warn('Элемент не найден:', cellId);
        }
    });
}

async function restoreNewTR(){
    const tabTrMap = pathTabStore.get(`new_tr.${currentTabId}`);
    if (tabTrMap) { 
        for (const newTrId in tabTrMap) {
            const trData = tabTrMap[newTrId];
            insertNewTr(trData.tr_id_position, newTrId, trData.position, false);
  
            await convertTextToHTML(document.getElementById(`${newTrId}_topic`), pathTabStore.get(`content.${currentTabId}.${newTrId}_topic`), false);
            await convertTextToHTML(document.getElementById(`${newTrId}_content`), pathTabStore.get(`content.${currentTabId}.${newTrId}_content`), false);
            await convertTextToHTML(document.getElementById(`${newTrId}_other`), pathTabStore.get(`content.${currentTabId}.${newTrId}_other`), false);   
        }
    }
}

async function DeleteTR(cell_id) {
    document.getElementById(cell_id).classList.remove('show-settings');

    const cellElement = document.getElementById(cell_id);
    const tr_id = cellElement.parentNode.id;
    document.getElementById(tr_id).remove();
    if (cellElement.hasAttribute('data-new')) {
        // просто удалить из DOM и из pathTabStore. Так как файла нет. Картинка не удалится
        pathTabStore.delete(`new_tr.${currentTabId}.${tr_id}`);
        pathTabStore.delete(`content.${currentTabId}.${cell_id}`);
        pathTabStore.delete(`settings.${currentTabId}.${cell_id}`);
    }else{
        if (!pathTabStore.has(`delete_tr.${currentTabId}.${tr_id}`)) {
            pathTabStore.set(`delete_tr.${currentTabId}.${tr_id}`, '');
        }
        pathTabStore.delete(`content.${currentTabId}.${cell_id}`);
        pathTabStore.delete(`settings.${currentTabId}.${cell_id}`);
    }
    isUpdateSettings=true;// удалить из файла src/config/table-settings.json
}

function AddTRBefore(cell_id){
    const new_tr_id = `${currentTabId}_`+generateHashCrypto();
    let tr_id_position = document.getElementById(cell_id).parentNode.id;
    let new_tr = {
        tr_id_position: tr_id_position,  
        position: 'before'
    };
    pathTabStore.set(`new_tr.${currentTabId}.${new_tr_id}`, new_tr);
    insertNewTr(tr_id_position, new_tr_id, 'before',true);
}

function AddTRAfter(cell_id){
    const new_tr_id = `${currentTabId}_`+generateHashCrypto();
    let tr_id_position = document.getElementById(cell_id).parentNode.id;
    let new_tr = {
        tr_id_position: tr_id_position,  
        position: 'after'
    };
    pathTabStore.set(`new_tr.${currentTabId}.${new_tr_id}`, new_tr);
    insertNewTr(tr_id_position, new_tr_id, 'after',true);
}

function insertNewTr(current_td_id, new_tr_id, position = 'after',is_add_setting_menu=false) {
    const target_tr = document.getElementById(current_td_id);
    if (!target_tr) {
        console.error(`tr с ID "${current_td_id}" не найден`);
        return;
    }

    const div_cell_content = document.createElement('div');
    div_cell_content.className = 'cell-content';
    div_cell_content.contentEditable = 'true';

    const new_tr = document.createElement('tr');
    new_tr.id = new_tr_id;
    const td_topic = document.createElement('td');
    td_topic.id = `${new_tr_id}_topic`;
    td_topic.setAttribute('data-new', 'true');
    td_topic.appendChild(div_cell_content.cloneNode(false)); 
    if (is_add_setting_menu){setupCellSettingsMenu(td_topic);}
    new_tr.appendChild(td_topic);

    const td_content = document.createElement('td');
    td_content.id = `${new_tr_id}_content`;
    td_content.setAttribute('data-new', 'true');
    td_content.appendChild(div_cell_content.cloneNode(false)); 
    if (is_add_setting_menu){setupCellSettingsMenu(td_content);}
    new_tr.appendChild(td_content);

    const td_other = document.createElement('td');
    td_other.id = `${new_tr_id}_other`;
    td_other.setAttribute('data-new', 'true');
    td_other.appendChild(div_cell_content.cloneNode(false)); 
    if (is_add_setting_menu){setupCellSettingsMenu(td_other);}
    new_tr.appendChild(td_other);
 
    if (position === 'before') {
        target_tr.parentNode.insertBefore(new_tr, target_tr);
    } else if (position === 'after') {
        target_tr.parentNode.insertBefore(new_tr, target_tr.nextSibling);
    } else {
        console.error('Позиция должна быть before или after');
    }
    console.warn('сохранить данные ячейки до перехода на другой TAB');
}

// Настройка событий меню
function setupMenuEvents(cell, menu) {
    menu.addEventListener('click', e => e.stopPropagation());
    
    const fontSizeInput = menu.querySelector('.font-size');
    fontSizeInput.addEventListener('input', e => {
        isUpdateSettings = true;
        const value = `${e.target.value}px`;
        pathTabStore.update(`settings.${currentTabId}.${cell.id}.fontSize`, () => value);
        applyCellSettings(cell, { fontSize: value });
    });

    const bgColorInput = menu.querySelector('.bg-color');
    bgColorInput.addEventListener('input', e => {
        isUpdateSettings = true;
        pathTabStore.update(`settings.${currentTabId}.${cell.id}.backgroundColor`, () => e.target.value);
        applyCellSettings(cell, { backgroundColor: e.target.value });
    });

    const columnWidthInput = menu.querySelector('.column-width');
    if (columnWidthInput && cell.tagName === 'TH') {
        columnWidthInput.addEventListener('input', e => {
            isUpdateSettings = true;
            const width = parseInt(e.target.value);
            if (width >= 1) {
                pathTabStore.update(`settings.${currentTabId}.${cell.id}.width`, () => width);
                applyCellSettings(cell, { width: width });
            }
        });
    }

    const rowHeightInput = menu.querySelector('.row-height');
    if (rowHeightInput) {
        rowHeightInput.addEventListener('input', e => {
            isUpdateSettings = true;
            const height = parseInt(e.target.value);
            const row = cell.parentElement;
            
            if (height >= 30) {
                row.style.height = `${height}px`;
                row.style.minHeight = `${height}px`;
                row.dataset.fixedHeight = "true";
            } else if (e.target.value === '') {
                row.style.height = 'auto';
                row.style.minHeight = 'auto';
                delete row.dataset.fixedHeight;
            }
            pathTabStore.update(`settings.${currentTabId}.${cell.id}.rowHeight`, () => height >= 30 ? `${height}px` : 'auto');
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

function generateHashCrypto(n=8) {
    const bytes = new Uint8Array(n); // 8 байт = 64 бита
    crypto.getRandomValues(bytes);   
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))  
        .join('');
}

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
        if (e.key === 'Escape') {
            closeModal();
        }
    }, true);
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

window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
      if (e.target.dataset.errorHandled) {
          // избежать бесконечного цикла
          return false; 
      }
      e.preventDefault();
      e.target.dataset.errorHandled = 'true';
      e.target.src = `${basePath}/config/img/coming-soon.gif`; 
      return false;
    }
}, true);

async function saveToGitHub() {
    let files = [];
    if (isUpdateSettings === true) {
        files.push({
            path: pathSettings,
            content: JSON.stringify(pathTabStore.get('settings'), null, 2)
        });
    }

    const content = pathTabStore.get('content');
    if (content && Object.keys(content).length > 0) {
      for (const tabId in content) {
        const tabContent = content[tabId];
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
    } 
    
    let editorCommands = [];

    // Добавляем файл с командами для editor-md 
    const new_tr = pathTabStore.get('new_tr');
    if (new_tr && Object.keys(new_tr).length > 0) {
        generateAddTREditorCommands(new_tr, editorCommands);
    }
 
    const delete_tr = pathTabStore.get('delete_tr');
    if (delete_tr && Object.keys(delete_tr).length > 0) {
        generateDeleteTREditorCommands(delete_tr, editorCommands);
    }

    const new_tabs_summary = pathTabStore.get('summary');
    if (new_tabs_summary && Object.keys(new_tabs_summary).length > 0) {
        files.push({
            path: `src/SUMMARY.md`,
            content: new_tabs_summary
        });
        const response = await fetch(`${basePath}/SUMMARY.md`);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const origin_tabs_summary = await response.text();
        const new_tabs = findNewTabIds(origin_tabs_summary, new_tabs_summary);
        editorCommands.push({
            type: 'add-tabs',
            tabs_id: new_tabs
        });            
    }

    if(editorCommands.length > 0){
        files.push({
            path: 'editor-commands.json',
            content: JSON.stringify(editorCommands, null, 2)
        });
    }

    if (files.length === 0) {
        console.warn("Нет новых данных");
        return;
    }

    const token = prompt("Введите ваш GitHub токен:");
    if (!token) {
        console.error("Ошибка: Заполните поля GitHub token");
        return;
    }

    await commitMultipleFilesToGitHub2({
        owner: owner,
        repo: repo,
        branch: branch,
        token: token,
        commitMessage: 'Обновление файлов репозитория',
        files: files
    });

    // Очистка isUpdateSettings и обновление localStorage
    isUpdateSettings = false;
    
    blockScreen();
    
}

// Функция для генерации команд editor-md на основе данных new_tr
function generateAddTREditorCommands(newTr, commands) {
    for (const [tab_id, tab_data] of Object.entries(newTr)) {
        for (const [new_tr_id, cell] of Object.entries(tab_data)) {
            const command = {
                type: 'add-tr',
                tab_id: tab_id,
                tr_id: new_tr_id,
                tr_id_position: cell.tr_id_position,
                position: cell.position
            };
            commands.push(command);
        }
    }
}

// Функция для генерации команд editor-md на основе данных delete_tr
function generateDeleteTREditorCommands(delete_tr, commands) {
    for (const [tab_id, tab_data] of Object.entries(delete_tr)) {
        for (const [new_tr_id, cell] of Object.entries(tab_data)) {
            const command = {
                type: 'delete-tr',
                tab_id: tab_id,
                tr_id: new_tr_id,
            };
            commands.push(command);
        }
    }
}

async function commitMultipleFilesToGitHub({ owner, repo, branch, token, files, commitMessage }) {
    const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
    };

    // 1: Получить SHA последнего коммита на ветке
    const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`, { headers });
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    // 2: Получить SHA дерева этого коммита
    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, { headers });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3: Создать новое дерево с новыми файлами
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

    // 4: Создать коммит с новым деревом
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

    // 5: Обновить ссылку ветки на новый коммит
    const updateRefRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            sha: newCommitSha,
        }),
    });

    if (updateRefRes.ok) {
        console.log('Успешно закоммичено!');
    } else {
        const err = await updateRefRes.json();
        console.error('Ошибка обновления ветки:', err.message || err);
    }
}

// вариантр для передачи контента и настроек вместе с файлом
async function commitMultipleFilesToGitHub2({ owner, repo, branch, token, files, commitMessage }) {
    const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
    };

    // 1: Получить SHA последнего коммита на ветке
    const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`, { headers });
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    // 2: Получить SHA дерева этого коммита
    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, { headers });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3: Если есть файлы с content, создаём для них blob
    const tree = [];
    for (const file of files) {
        if (file.sha) {
            // уже есть sha — просто добавляем
            tree.push({
                path: file.path,
                mode: '100644',
                type: 'blob',
                sha: file.sha,
            });
        } else if (file.content) {
            // создаём blob из content (base64 если бинарник)
            const blobRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    content: file.content,
                    encoding: file.encoding || 'utf-8', // base64 для картинок
                }),
            });
            const blobData = await blobRes.json();

            tree.push({
                path: file.path,
                mode: '100644',
                type: 'blob',
                sha: blobData.sha,
            });
        }
    }

    // 4: Создать новое дерево
    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            base_tree: baseTreeSha,
            tree,
        }),
    });
    const treeData = await treeRes.json();

    // 5: Создать коммит
    const commitResNew = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            message: commitMessage,
            tree: treeData.sha,
            parents: [latestCommitSha],
        }),
    });
    const newCommitData = await commitResNew.json();

    // 6: Обновить ссылку ветки
    const updateRefRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            sha: newCommitData.sha,
        }),
    });

    if (updateRefRes.ok) {
        console.log('Успешно закоммичено!');
    } else {
        const err = await updateRefRes.json();
        console.error('Ошибка обновления ветки:', err.message || err);
    }
}

async function uploadImage(cell_id, file) {
    document.getElementById(cell_id).classList.remove('show-settings');
    if (!file){
        console.warn('Картинка не выбрана')
        return;
    }   

    // Проверка размера: GitHub ограничивает blob до 100 MB, но лучше < 10 MB
    if (file.size > 10 * 1024 * 1024) {
        console.warn("Файл слишком большой! До 10MB желательно.");
        return;
    }

    const extension = file.name.split('.').pop().toLowerCase();
    const name_picture = `${cell_id}_`+generateHashCrypto(2)+`.${extension}`;
     
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
     
    // Проверяем расширение и MIME тип
    if (!allowedExtensions.includes(extension)) {
      console.warn('Недопустимый тип файла! Разрешены только: ' + allowedExtensions.join(', '));
      return;
    }
    
    if (!allowedMimeTypes.includes(file.type)) {
      console.warn('Недопустимый MIME тип файла!');
      return;
    }

    let HTML_img = `
    <img src="${basePath}/images/${name_picture}" alt="..." style="width: 10%; height: auto;">`;
    let markdown_content = await loadContent(cell_id, HTML_img);
    let new_content = '';
    if (!markdown_content || Object.keys(markdown_content).length === 0) {
      new_content = HTML_img;
    }else{
      new_content = markdown_content + HTML_img;
    }
    pathTabStore.set(`content.${currentTabId}.${cell_id}`, new_content);
    await convertTextToHTML(document.getElementById(cell_id), new_content);

    const base64 = await readFileAsBase64(file);

    const cleanBase64 = base64.split(',')[1];// Удаляем префикс data:image/png;base64,...
 
    const token = prompt("Введите ваш GitHub токен:");
    if (!token) {
        console.error("Ошибка: Заполните поля GitHub token");
        return;
    }
    const filePath = `src/images/${name_picture}`; // путь в репо

    const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
    };

    // 1. Получаем SHA последнего коммита
    const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`, { headers });
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    // 2. Получаем SHA дерева
    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, { headers });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3. Создаём blob
    const blobRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            content: cleanBase64,
            encoding: 'base64',
        }),
    });
    const blobData = await blobRes.json();

    // 4. Создаём новое дерево
    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            base_tree: baseTreeSha,
            tree: [
                {
                    path: filePath,
                    mode: '100644',
                    type: 'blob',
                    sha: blobData.sha,
                },
            ],
        }),
    });
    const treeData = await treeRes.json();

    // 5. Создаём коммит
    const newCommitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            message: `Add picture: ${name_picture}`,
            tree: treeData.sha,
            parents: [latestCommitSha],
        }),
    });
    const newCommitData = await newCommitRes.json();

    // 6. Обновляем ссылку ветки
    const updateRefRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            sha: newCommitData.sha,
        }),
    });

    if (updateRefRes.ok) {
        alert("Картинка успешно загружена!");
        window.location.reload();
    } else {
        const err = await updateRefRes.json();
        console.error("Ошибка при обновлении ветки:", err);
        alert("Ошибка загрузки.");
    }
}

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function hundlerExecutePython(preBlock){
    let outputCode = preBlock.querySelector('.result');
    let codeBlock = preBlock.querySelector('code.language-python');
    if (!outputCode) {
        outputCode = document.createElement('code');
        outputCode.className = 'result hljs language-bash';
        preBlock.appendChild(outputCode);
    }
    const res = await execute_python(codeBlock.textContent);
    outputCode.textContent = res || "no result";
}

function addRunButtonsToPythonBlocks() {
    // Находим все блоки кода python
    const jsCodeBlocks = document.querySelectorAll('code.language-python');
    jsCodeBlocks.forEach(codeBlock => {
        const preBlock = codeBlock.closest('pre');
        if (preBlock) {
            // Проверяем, есть ли уже кнопка
            const existingButton = preBlock.querySelector('.play-button');
            if (existingButton) return;
            
            // Находим контейнер для кнопок
            let buttonsDiv = preBlock.querySelector('div.buttons');
            if (!buttonsDiv) {
                return;
            }
            // Создаем кнопку запуска
            const runButton = document.createElement('button');
            runButton.className = 'fa fa-play play-button';
            runButton.setAttribute('title', 'Run this code');
            runButton.setAttribute('aria-label', 'Run this code');
            
            runButton.addEventListener('click', () => {
                hundlerExecutePython(preBlock);
            });
            buttonsDiv.appendChild(runButton);

            // Создаем кнопку отмены
            /*const undoChangesButton = document.createElement('button');
            undoChangesButton.className = 'fa fa-history reset-button';
            undoChangesButton.setAttribute('title', 'Undo changes');
            undoChangesButton.setAttribute('aria-label', 'Undo changes');
            undoChangesButton.addEventListener('click', hundlerUndoChanges);
            buttonsDiv.appendChild(undoChangesButton);*/
        }
    });
}    
 
async function hundlerUndoChanges(event) {
    console.warn('обновляет всю ячейку');
    /*
    const cell_id = event.target.closest('td').id;
    console.log(`cell id=${cell_id}`);

    const cellElement = document.getElementById(cell_id);
    if (cellElement?.hasAttribute('data-new')) {
        return;
    }

    const response = await fetch(`${basePath}/tabs/${currentTabId}/include/${cell_id}.md`);
    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }
    let markdown_content = await response.text();
    pathTabStore.set(`content.${currentTabId}.${cell_id}`, markdown_content);

      
    // const pre = undoChangesButton.closest('pre');
    // const codeBlock = pre.querySelector('code');
    // console.log(`codeBlock=${codeBlock.innerText}`);
    // найти кусок кода согласно последовательности в td и обновить в markdown ....
     

    convertTextToHTML(cellElement, markdown_content, true);
    */
}

function checkBacktickFormatting(text) {
    const codeBlockRegex = /```[\s\S]*?```/g;
    let match;
  
    while ((match = codeBlockRegex.exec(text)) !== null) {
      const end = codeBlockRegex.lastIndex;
  
      const restOfLine = text.slice(end).split('\n')[0];
      const afterLineStart = end + restOfLine.length;
  
      if (text[afterLineStart] !== '\n') {
        alert('После блока кода с символами ``` должен быть перенос строки');
        console.error('После блока кода с символами ``` должен быть перенос строки');
        return false;
      }
    }
    return true;
}
 
async function getPyodide() {
    try{
        if (!window.pyodide) {
            //await import(`${basePath}/js/pyodide.v0.23.4.js`);
            await import(`${basePath}/js/pyodide.full.v0.28.0.js`);
            window.pyodide = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.0/full/"
            });
          }
    }catch (e) {
        console.error(`Ошибка: ${e}`);
    }
}

// Execute python
// see https://pyodide.org/en/stable/usage/quickstart.html
async function execute_python(code) {
    try {
        await getPyodide();
        let stdout = "";
        // Устанавливаем перехват stdout
        window.pyodide.setStdout({
          batched: (text) => {
            stdout += text;
          }
        });
        const result = await window.pyodide.runPythonAsync(code);
        return stdout.trim() || String(result) || "Код выполнен";
    } catch (e) {
      return `Ошибка: ${e}`;
    }
}

function formatTitle(title) {
    // Заменяем нижние подчеркивания на пробелы
    let formattedText = title.replace(/_/g, ' ');
    if (formattedText.length > 0) {
      formattedText = formattedText[0].toUpperCase() + formattedText.slice(1);
    }
    // Вставляем отформатированный текст в элемент с классом menu-title
    const menuTitleElement = document.querySelector('.menu-title');
    if (menuTitleElement) {
      menuTitleElement.textContent = formattedText;
    }
    return formattedText;
}

function addEditButtonTab(){
    const sidebarScrollbox = document.querySelector('.sidebar-scrollbox')
    if (sidebarScrollbox) {
        const newButton = document.createElement('button');
        newButton.textContent = 'Edit Tabs';  
        newButton.id = 'edit_tabs';
        newButton.addEventListener('click', async () => {
            try {
                const modal = document.getElementById('textModalTab');
                const editor = document.getElementById('modalTextEditorTab'); 
                editor.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab') {
                        e.preventDefault();  
                        
                        const start = this.selectionStart;
                        const end = this.selectionEnd;
                        const spaces = '    ';  
                        
                        // Вставляем пробелы в позицию курсора
                        this.value = this.value.substring(0, start) + spaces + this.value.substring(end);
                        this.selectionStart = this.selectionEnd = start + spaces.length;
                    }
                });
                editor.addEventListener('wheel', function(e) {
                    e.preventDefault(); 
                    this.scrollTop += e.deltaY; // Скроллим содержимое textarea
                });
                let markdownContent = pathTabStore.get(`summary`);
                if (!markdownContent || Object.keys(markdownContent).length === 0) {
                    const response = await fetch(`${basePath}/SUMMARY.md`);
                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
                    }
                    markdownContent = await response.text();
                }
                editor.value = markdownContent;
                modal.classList.add('show');
                editor.focus();
                editor.setSelectionRange(0, 0);
                editor.scrollTop = 0;
                // Дополнительная проверка для браузеров
                if (editor.createTextRange) {
                    const range = editor.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', 0);
                    range.moveStart('character', 0);
                    range.select();
                }
               
            } catch (error) {
                console.error('Ошибка при загрузке Markdown файла:', error);
            }
        });
        sidebarScrollbox.appendChild(newButton);
    } else {
        console.error('Элемент .sidebar-scrollbox не найден.');
    }
}

function findNewTabIds(origin_tabs_summary, new_tabs_summary) {
    const extractTabIds = (content) => {
        const regex = /\[.*?\]\(\.\/tabs\/([^\/]+)\/index\.md\)/g;
        return [...content.matchAll(regex)].map(match => match[1]);
    };
    const ids1 = new Set(extractTabIds(origin_tabs_summary));
    const ids2 = extractTabIds(new_tabs_summary);
    return ids2.filter(id => !ids1.has(id));
}

/*function findNewTabIds(origin_tabs_summary, new_tabs_summary) {
    // Извлекает tab ID из строки origin ссылки
    function extractTabId(line) {
        // Регулярное выражение для поиска паттерна ./tabs/<TAB ID>/index.md
        const regex = /\[.*?\]\(\.\/tabs\/([^\/]+)\/index\.md\)/;
        const match = line.match(regex);
        
        return match ? match[1] : null;
    }
    // Извлекает все tab ID из origin содержимого
    function extractAllTabIds(markdownContent) {
        const lines = markdownContent.split('\n');
        const tabIds = [];
        
        for (const line of lines) {
            const tabId = extractTabId(line);
            if (tabId) {
                tabIds.push(tabId);
            }
        }
        
        return tabIds;
    }
    const tabIds1 = extractAllTabIds(origin_tabs_summary);
    const tabIds2 = extractAllTabIds(new_tabs_summary);
    
    // Создаем Set для быстрого поиска
    const existingIds = new Set(tabIds1);
    
    // Фильтруем новые ID
    const newIds = tabIds2.filter(id => !existingIds.has(id));
    
    return newIds;
}*/

function insertLockOverlay() {
    const overlayHTML = `
        <div class="overlay hidden" id="lockOverlay">
            <div class="lock-container">
                <div class="lock-icon">🔒</div>
                <div class="message">Build Ci/CD</div>
                <div class="timer" id="timer">50</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <p>save...</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', overlayHTML);
}

function blockScreen() {
    const overlay = document.getElementById('lockOverlay');
    const timer = document.getElementById('timer');
    const progressFill = document.getElementById('progressFill');
    overlay.classList.remove('hidden');// Показываем блокировку
    let timeLeft = 60;
    const totalTime = 60;
    const interval = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        const progress = ((totalTime - timeLeft) / totalTime) * 100;
        progressFill.style.width = progress + '%';
        if (timeLeft <= 0) {
            clearInterval(interval);
            pathTabStore.drop();
            reloadWithCacheClear();// Перезагружаем страницу с очисткой кеша
        }
    }, 1000);
}

function reloadWithCacheClear() {
    // Способ 1: Принудительная перезагрузка с очисткой кеша
    // window.location.reload(true);
    
    // Способ 2: Альтернативный вариант
    // window.location.href = window.location.href + '?t=' + new Date().getTime();
    
    // Способ 3: Для более агрессивной очистки
    if ('caches' in window) {
        caches.keys().then(names => {
            names.forEach(name => {
                caches.delete(name);
            });
        });
    }
    window.location.reload(true);
}