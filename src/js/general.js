const owner = 'Jekahome';
const repo = 'snippet-stash';
const branch = 'main';

const isGitHubPages = window.location.host.includes('github.io');
const basePath = isGitHubPages ? `/${repo}` : ''; // для возможности тестирования на localhost 

const generate_count_tr = 100; // количество создаваемых TR в новом TAB
const pathSettings = 'src/config/table-settings.json'; 
let editCellId = null;
let isGlobalScriptReady = false;
let isReloadMermaid = false;
let currentTabId = null; 
let isUpdateSettings = false;

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
            
            // Общие настройки (применяются ко всем типам диаграмм)
            fontFamily: 'Arial, sans-serif',
            securityLevel: 'loose', // для разрешения HTML-тегов и других функций

            // Настройки для конкретных типов диаграмм:
            flowchart: {
                useMaxWidth: false,
                htmlLabels: true,
                curve: 'basis',
                diagramPadding: 10,
            },
            sequence: {
                diagramMarginX: 50,
                diagramMarginY: 10,
                actorMargin: 50,
            },
            gantt: {
                barHeight: 20,
                axisFormat: '%Y-%m-%d'
            },
            mindmap: {
                spacingFactor: 1.5,    // множитель расстояния между узлами
                padding: 1,           // отступы вокруг диаграммы (px)
                nodeTextMargin: 3,     // отступ текста от границы узла
            },
            er: { // Диаграммы сущность-связь (Entity-Relationship)
                diagramPadding: 20,    // отступы вокруг диаграммы
                layoutDirection: 'TB', // направление: TB (сверху вниз), LR (слева направо)
                stroke: '#333',        // цвет линий
                fill: 'lightyellow',   // цвет заливки сущностей
            },
            state: {
                diagramPadding: 20,    // отступы вокруг диаграммы
                useMaxWidth: false,
                noteMargin: 10,        // отступ для заметок
            },
            journey: {
                diagramMarginX: 50,    // горизонтальные отступы
                diagramMarginY: 20,     // вертикальные отступы
                actorMargin: 30,       // отступ между участниками
            },
            xychart: {
                width: 600,            // ширина диаграммы (px)
                height: 400,           // высота диаграммы (px)
                xAxis: {
                    title: 'X Axis',   // заголовок оси X
                    labelPadding: 10,
                },
                yAxis: {
                    title: 'Y Axis',   // заголовок оси Y
                    labelPadding: 10,
                },
            },
            git: { // Git-граф (график ветвления)
                diagramPadding: 20,
                nodeLabel: {
                    width: 75,        // ширина блока коммита
                    height: 30,       // высота блока коммита
                },
                mainBranchName: 'main', // название основной ветки
            },
            pie: {
                width: 400,           // ширина диаграммы
                height: 400,          // высота диаграммы
                textPosition: 0.8,     // позиция текста (0.8 = 80% радиуса)
            },
            quadrantChart: {
                chartWidth: 600,       // ширина диаграммы
                chartHeight: 600,      // высота диаграммы
                axisPadding: 100,      // отступ осей от краев
                quadrantPadding: 20,    // отступ между квадрантами
                xAxisPosition: 'middle', // положение оси X ('middle' или 'top'/'bottom')
                yAxisPosition: 'middle', // положение оси Y ('middle' или 'left'/'right')
            }
        });

        await storageLoadSettingsFromFile(basePath, currentTabId);
        
        //if (!window.markdownit) {console.error('markdown-it не загружен');return; }
        //window.md = window.markdownit({ html: true, breaks: true,});
         
        initHighlightJSv9_18_1();// initHighlightJS();
        
        addRunButtonsToPythonBlocks();
        
        /*const md_wasm = await import(`${basePath}/js/md_wasm.js`);
        await md_wasm.default();
        window.render_markdown = md_wasm.render_markdown;
        console.log("md_wasm.js loaded");*/

        // лениво загружает md_wasm
        window.render_markdown = async function(...args) {
            if (!window._md_wasm_loaded) {  
                const md_wasm = await import(`${basePath}/js/md_wasm.js`);
                await md_wasm.default();
                window._md_wasm_loaded = true;  
                window.render_markdown = md_wasm.render_markdown;
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
        if (!confirm("Confirm undo session modifications?")) {
         return;
        }
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
        if (!confirm("Confirm undo TAB session modifications?")) {
         return;
        }
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
    // Нумерация строк (если используется highlightjs-line-numbers.js)
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
            return `<div class="mermaid">${code}</div${gt}`;
        }else{
            const escapedCode = escapeHtml(code);
            return `<code class="language-${lang}">${escapedCode}</code${gt}`;
        }
    });
}

async function reloadMermaidDiagrams() {
    const diagrams = Array.from(document.querySelectorAll('.mermaid')).filter(el => !el.querySelector('svg'));

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
        const html = await render_markdown(node_details.textContent);
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

function AddBlockMermaidModal(key){
    const editor = document.getElementById('modalTextEditor');


    switch (key) {
    case 'flowchart':
    editor.value +="\n\
<div class=\"mermaid\">\n\
flowchart TD\n\
    A[Start] o--o B{Is it?}\n\
    B -- Yes --> C[OK]\n\
    C --o D[Rethink]\n\
    D x--x B\n\
    B ==> No ----> E[End]\n\
</div>";
        break;
    case 'mindmap':
    editor.value +="\n\
<div class=\"mermaid\">\n\
mindmap\n\
  root((mindmap))\n\
    Origins\n\
      Long history\n\
      ::icon(fa fa-book)\n\
      Popularization\n\
        British popular psychology author Tony Buzan\n\
    Research\n\
      On effectiveness<br/>and features\n\
      On Automatic creation\n\
        Uses\n\
            Creative techniques\n\
            Strategic planning\n\
            Argument mapping\n\
    Tools\n\
      Pen and paper\n\
      Mermaid\n\
</div>";
        break;
    case 'pie':
    editor.value +="\n\
<div class=\"mermaid\">\n\
%%{init: {\"pie\": {\"textPosition\": 0.5}, \"themeVariables\": {\"pieOuterStrokeWidth\": \"5px\"}} }%%\n\
pie showData\n\
    title Key elements in Product X\n\
    \"Calcium\" : 42.96\n\
    \"Potassium\" : 50.05\n\
    \"Magnesium\" : 10.01\n\
    \"Iron\" :  5\n\
</div>";
        break; 
    case 'git':
    editor.value +="\n\
<div class=\"mermaid\">\n\
gitGraph\n\
        commit\n\
        commit\n\
        branch develop\n\
        checkout develop\n\
        commit\n\
        commit\n\
        checkout main\n\
        merge develop\n\
        commit\n\
        commit\n\
</div>";
        break;
    case 'architecture':
    editor.value +="\n\
<div class=\"mermaid\">\n\
architecture-beta\n\
    group api(cloud)[API]\n\
\n\
    service db(database)[Database] in api\n\
    service disk1(disk)[Storage] in api\n\
    service disk2(disk)[Storage] in api\n\
    service server(server)[Server] in api\n\
\n\
    db:L -- R:server\n\
    disk1:T -- B:server\n\
    disk2:T -- B:db\n\
</div>";
        break;
    case 'state':
    editor.value +="\n\
<div class=\"mermaid\">\n\
stateDiagram\n\
    [*] --> Still\n\
    Still --> [*]\n\
    Still --> Moving\n\
    Moving --> Still\n\
    Moving --> Crash\n\
    Crash --> [*]\n\
</div>";
        break;
    case 'sequence':
    editor.value +="\n\
<div class=\"mermaid\">\n\
sequenceDiagram\n\
    Browser->> Python : Do work 1\n\
    Python ->> Rust : Workspace Path\n\
    Rust ->> Rust : Do work 2\n\
    Rust ->> Python : Do work 3\n\
    Python ->> Browser : Do work 4\n\
</div>";
        break;   
    case 'journey':   
    editor.value +="\n\
<div class=\"mermaid\">\n\
journey\n\
    title My working day\n\
    section Go to work\n\
      Make tea: 5: Me\n\
      Go upstairs: 3: Me\n\
      Do work: 1: Me, Cat\n\
    section Go home\n\
      Go downstairs: 5: Me\n\
      Sit down: 5: Me\n\
</div>";     
        break;
    case 'xychart':   
    editor.value +="\n\
<div class=\"mermaid\">\n\
xychart-beta\n\
  title \"Training progress\"\n\
  x-axis [mon, tues, wed, thur, fri, sat, sun]\n\
  y-axis \"Time trained (minutes)\" 0 --> 300\n\
  bar [60, 0, 120, 180, 230, 300, 0]\n\
  line [60, 0, 120, 180, 230, 300, 0]\n\
</div>";  
        break;
    case 'class':
    editor.value +="\n\
<div class=\"mermaid\">\n\
classDiagram\n\
class Square~Shape~{\n\
    int id\n\
    List~int~ position\n\
    setPoints(List~int~ points)\n\
    getPoints() List~int~\n\
}\n\
\n\
Square : -List~string~ messages\n\
Square : +setMessages(List~string~ messages)\n\
Square : +getMessages() List~string~\n\
Square : +getDistanceMatrix() List~List~int~~\n\
\n\
</div>";       
        break;
    case 'timeline':
    editor.value +="\n\
<div class=\"mermaid\">\n\
timeline\n\
    title History of Social Media Platform\n\
    2002 : LinkedIn\n\
    2004 : Facebook\n\
         : Google\n\
    2005 : YouTube\n\
    2006 : Twitter\n\
\n\
</div>";       
        break;
    case 'kanban':
    editor.value +="\n\
<div class=\"mermaid\">\n\
---\n\
config:\n\
  kanban:\n\
    ticketBaseUrl: 'https://mermaidchart.atlassian.net/browse/#TICKET#'\n\
---\n\
kanban\n\
  Todo\n\
    [Create Documentation]\n\
    docs[Create Blog about the new diagram]\n\
  [In progress]\n\
    id6[Create renderer so that it works in all cases. We also add some extra text here for testing purposes. And some more just for the extra flare.]\n\
  id9[Ready for deploy]\n\
    id8[Design grammar]@{ assigned: 'knsv' }\n\
  id10[Ready for test]\n\
    id4[Create parsing tests]@{ ticket: MC-2038, assigned: 'K.Sveidqvist', priority: 'High' }\n\
    id66[last item]@{ priority: 'Very Low', assigned: 'knsv' }\n\
  id11[Done]\n\
    id5[define getData]\n\
    id2[Title of diagram is more than 100 chars when user duplicates diagram with 100 char]@{ ticket: MC-2036, priority: 'Very High'}\n\
    id3[Update DB function]@{ ticket: MC-2037, assigned: knsv, priority: 'High' }\n\
\n\
  id12[Can't reproduce]\n\
    id3[Weird flickering in Firefox]\n\
\n\
</div>";     
        break; 
    default:
    editor.value +="\n\
<div class=\"mermaid\">\n\
graph TD\n\
    A --> B\n\
</div>";
    }    
}

function AddBlockMarkdownModal(key){
    const editor = document.getElementById('modalTextEditor');
    switch (key) {
    case 'details':
    editor.value +="\n\
<details>\n\
<summary>Summary</summary>\n\
\n\
</details>\n\
";
        break;
    case 'table':
editor.value +="\n\
| Left-aligned | Center-aligned | Right-aligned |\n\
| :---         |     :---:      |   ---:        |\n\
| git status   | git status     | git status    |\n\
| git diff     | git diff       | git diff      |\n\
";
        break;
    case 'link':
editor.value +="\n\
Are you still using [Yahoo][] or [MSN][] search?\n\
\n\
[msn]:    http://search.msn.com/    \"MSN Search\"\n\
[yahoo]:  http://search.yahoo.com/  \"Yahoo Search\"\n\
";
        break;
    case 'checkbox':
    editor.value +="\n\
- [x] Основная задача\n\
  - [ ] Подзадача 1\n\
  - [ ] Подзадача 2\n\
    - [x] Подзадача 2.1\n\
";        
        break;
    case 'line':
    editor.value +="\n\
---\n\
\n\
";        
        break;  
    case 'list':
    editor.value +="\n\
1. Пункт 1\n\
    - Подпункт A\n\
    - Подпункт Б\n\
1. Пункт 2\n\
1. Пункт 3\n\
    1. Подпункт A\n\
    1. Подпункт Б\n\
    1. Подпункт B\n\
";   
        break;
    default:
    editor.value +="\n\
<details>\n\
<summary>Summary</summary>\n\
\n\
</details>\n\
";
    }
}

function toggleEditModal(menu){
  const content = menu.querySelector('.dropdown-content-edit-modal');
  content.style.display = content.style.display === 'flex' ? 'none' : 'flex';
}

function addHTMLModal() {
    if (document.getElementById('textModal')) {
        console.warn('Модальное окно уже существует');
        return;
    }
    const modalHTML = `
        <div id="textModal" class="modal">
            <div class="modal-content">
                <textarea id="modalTextEditor" class="modal-text-editor" placeholder="..."></textarea>
                <div class="modal-footer">
                    <div class="modal-footer-left">           
                        <button class="icon-button rust-icon" title="Add Rust code block" onclick="AddCodeBlockModal('rust')" style="cursor: pointer;">
                           <img src="${basePath}/config/img/rust-logo-blk.svg" alt="Rust" width="25" height="25">
                        </button>
                        <button class="icon-button python-icon" title="Add Python code block" onclick="AddCodeBlockModal('python')" style="cursor: pointer;">
                           <img src="${basePath}/config/img/python_logo_icon.svg" alt="Python" width="25" height="25">
                        </button>
                        <button class="icon-button c-icon" title="Add C code block" onclick="AddCodeBlockModal('c')" style="cursor: pointer;">
                           <img src="${basePath}/config/img/c-programming.png" alt="C" width="25" height="25">
                        </button>
                        <div class="dropdown-menu-edit-modal" onclick="toggleEditModal(this)">
                            <button class="icon-button mermaid-icon" title="Add Mermaid block" style="cursor: pointer;">
                                <img src="${basePath}/config/img/mermaid.svg" alt="Mermaid" width="23" height="23">
                            </button>
                            <div class="dropdown-content-edit-modal">
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('flowchart')" style="cursor: pointer;">Flowchart</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('mindmap')" style="cursor: pointer;">Mindmap</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('pie')" style="cursor: pointer;">Pie</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('git')" style="cursor: pointer;">Git</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('architecture')" style="cursor: pointer;">Architecture</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('state')" style="cursor: pointer;">State</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('sequence')" style="cursor: pointer;">Sequence</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('journey')" style="cursor: pointer;">Journey</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('timeline')" style="cursor: pointer;">Timeline</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('xychart')" style="cursor: pointer;">XYchart</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('class')" style="cursor: pointer;">Class</label>
                                <label class="dropdown-item-edit-modal" title="Add Mermaid block" onclick="AddBlockMermaidModal('kanban')" style="cursor: pointer;">Kanban</label>
                            </div>
                        </div>
                        <div class="dropdown-menu-edit-modal" onclick="toggleEditModal(this)">
                            <button class="dropdown-toggle-edit-modal icon-button mermaid-icon" title="Add Markdown block" style="cursor: pointer;">
                                <i class="fa fa-code fa-lg" aria-hidden="true"></i>
                            </button>
                            <div class="dropdown-content-edit-modal">
                                <label class="dropdown-item-edit-modal" title="Add Markdown details block" onclick="AddBlockMarkdownModal('details')" style="cursor: pointer;">Details</label>
                                <label class="dropdown-item-edit-modal" title="Add Markdown line block" onclick="AddBlockMarkdownModal('list')" style="cursor: pointer;">List</label>
                                <label class="dropdown-item-edit-modal" title="Add Markdown table block" onclick="AddBlockMarkdownModal('table')" style="cursor: pointer;">Table</label>
                                <label class="dropdown-item-edit-modal" title="Add Markdown link block" onclick="AddBlockMarkdownModal('link')" style="cursor: pointer;">Link</label>
                                <label class="dropdown-item-edit-modal" title="Add Markdown checkbox block" onclick="AddBlockMarkdownModal('checkbox')" style="cursor: pointer;">Checkbox</label>
                                <label class="dropdown-item-edit-modal" title="Add Markdown line block" onclick="AddBlockMarkdownModal('line')" style="cursor: pointer;">Line</label>
                            </div>
                        </div>
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
    if(!value.includes('```mermaid') && !value.includes('class="mermaid"')){
        return true;
    }
    const testNode = document.createElement('div');
    testNode.innerHTML = convertMarkdownCodeBlocksToHtml(value);
    testNode.style.position = 'absolute';
    testNode.style.visibility = 'hidden';
    document.body.appendChild(testNode);
    const diagrams = Array.from(document.querySelectorAll('.mermaid')).filter(el => !el.querySelector('svg'));
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
        const copyButton = document.createElement('button');
        copyButton.className = 'clip-button';
        copyButton.title = 'Copy to clipboard';
        copyButton.setAttribute('aria-label', 'Copy to clipboard');
        const tooltip = document.createElement('i');
        tooltip.className = 'tooltiptext';
        copyButton.appendChild(tooltip);
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
                  alert(`${language} execution is not implemented`);
                  console.warn(`${language} execution is not implemented`);
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
        (async () => await formatTitle(currentTabId))(),  
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
        <label><input type="number" class="font-size" value="14" title="Font size TR" min="8" max="24"></label>
        <label><input type="color" class="bg-color" title="Background color TR" value="${rgbToHex(getComputedStyle(cell).backgroundColor) || '#f9f9f9'}"></label>
        <label><a class="btn btn-default" href="#" onclick="hundlerUndoChangesCell('${cell.id}')" title="Undo cell modifications"><i class="fa fa-undo fa-2x" aria-hidden="true"></i></a></label>   
    `;
    if (!isHeader) {
        menuHTML += `<label><a class="btn btn-default" href="#" onclick="DeleteTR('${cell.id}')" title="Delete TR"> <i class="fa fa-minus-square fa-2x" aria-hidden="true"></i> </a></label>
        <label><a class="btn btn-default" href="#" onclick="AddTRBefore('${cell.id}')" title="Add TR Before"><i class="fa fa-hand-o-up fa-2x" aria-hidden="true"></i></a></label>
        <label><a class="btn btn-default" href="#" onclick="AddTRAfter('${cell.id}')" title="Add TR After"><i class="fa fa-hand-o-down fa-2x" aria-hidden="true"></i></a></label>`;
    }else{
        menuHTML += `<label><a class="btn btn-default" href="#" onclick="AddTRAfter('${cell.id}')" title="Add TR After"><i class="fa fa-hand-o-down fa-2x" aria-hidden="true"></i></a></label>`;
    }
    if (isHeader) {
        const currentWidth = pathTabStore.get(`settings.${currentTabId}.${cell.id}.width`) ?? 200;
        menuHTML += `<label>W: <input type="number" class="column-width" title="Width TR" value="${currentWidth}" min="1" max="800"></label>`;
    }
    menuHTML += `<label><input type="number" class="row-height" placeholder="auto" title="Height TR" min="30" max="1000"></label>`;
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
    if (!confirm("Confirm deletion?")) {
      return;
    }
    const cellElement = document.getElementById(cell_id);
    const tr_id = cellElement.parentNode.id;
    document.getElementById(tr_id).remove();
    if (cellElement.hasAttribute('data-new')) {
        // TODO: images не удалятся
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
        // Если кликнули на ссылку
        if (e.target.tagName === 'A' && e.target.href && !e.target.hasAttribute('tabindex')) {
            e.preventDefault(); 
            window.open(e.target.href, '_blank');
        }
    });
}

window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
      if (e.target.dataset.errorHandled) {
          // TODO: избежать бесконечного цикла
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
            count_tr: `${generate_count_tr}`,
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
    const jsCodeBlocks = document.querySelectorAll('code.language-python');
    jsCodeBlocks.forEach(codeBlock => {
        const preBlock = codeBlock.closest('pre');
        if (preBlock) {
            const existingButton = preBlock.querySelector('.play-button');
            if (existingButton) return;
            let buttonsDiv = preBlock.querySelector('div.buttons');
            if (!buttonsDiv) {
                return;
            }
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
 
async function hundlerUndoChangesCell(cell_id) { 
    const cellElement = document.getElementById(cell_id);
    if (cellElement?.hasAttribute('data-new')) {
        pathTabStore.set(`content.${currentTabId}.${cell_id}`, '');
        cellElement.parentElement.removeAttribute('style');
        cellElement.removeAttribute('style');
        return;
    }
    const response = await fetch(`${basePath}/tabs/${currentTabId}/include/${cell_id}.md`);
    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }
    let markdown_content = await response.text();
    pathTabStore.set(`content.${currentTabId}.${cell_id}`, markdown_content);
    await convertTextToHTML(cellElement, markdown_content, true);
    cellElement.parentElement.removeAttribute('style');
    cellElement.removeAttribute('style');    
    const loadedSettings = await getSettingsFile();
    if (loadedSettings?.[currentTabId]?.[cell_id]) {
        applyCellSettings(cellElement, loadedSettings[currentTabId][cell_id]); 
    }
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
        // TODO: перехват stdout
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

// Устанавливает заголовок Tab используя имя ссылки из SUMMARY.md
async function formatTitle(tab_id) {
    async function getLinkTextByTabId(tab_id) {
        const response = await fetch(`${basePath}/SUMMARY.md`);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const markdown = await response.text();

        const regex = new RegExp(`\\[(.*?)\\]\\(\\.\\/tabs\\/${tab_id}\/index\\.md\\)`);
        const match = markdown.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }
    let formattedText = await getLinkTextByTabId(tab_id);
    if (formattedText==null){formattedText = tab_id.replace(/_/g, ' ');}
    if (formattedText.length > 0) {
      formattedText = formattedText[0].toUpperCase() + formattedText.slice(1);
    }
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