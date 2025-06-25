
 
const storageKey = "gridSettings";

function initGridSettings() {
    
    document.querySelectorAll('.grid-cell').forEach((cell, index) => {
        const trigger = document.createElement('div');
        trigger.className = 'settings-trigger';

        const menu = document.createElement('div');
        menu.className = 'settings-menu';
        
        // Определяем тип ячейки для корректного меню
        const isHeader = cell.classList.contains('grid-header');
        const isFirstInRow = isFirstCellInRow(index);
        
        let menuHTML = `
            <label>F: <input type="number" class="font-size" value="14"></label>
            <label>B: <input type="color" class="bg-color" value="#f9f9f9"></label>
            <label>T:
                <select class="content-type">
                    <option value="text">text</option>
                    <option value="code">code</option>
                    <option value="html">HTML</option>
                </select>
            </label>
        `;
        
        // Добавляем управление шириной для заголовков
        if (isHeader) {
            menuHTML += `<label>W: <input type="number" class="column-width" placeholder="px"></label>`;
        }
        
        // Добавляем управление высотой для первых ячеек в строке
        if (isFirstInRow && !isHeader) {
            menuHTML += `<label>H: <input type="number" class="row-height" placeholder="px"></label>`;
        }
        
        // Обычная ширина ячейки для всех остальных
        if (!isHeader && !isFirstInRow) {
            menuHTML += `<label>w: <input type="number" class="cell-width" placeholder="px"></label>`;
        }

        menu.innerHTML = menuHTML;

        setupMenuEvents(cell, menu, index);
        setupIconClick(cell, trigger);

        cell.dataset.gridIndex = index;
        cell.appendChild(trigger);
        cell.appendChild(menu);
    });

    setupGlobalClick();
    loadSettings();
}

function isFirstCellInRow(index) {
    const columns = 3;
    return index % columns === 0;
}

function setupMenuEvents(cell, menu, index) {
    const columns = 3;
    
    // Предотвращаем закрытие меню при клике внутри него
    menu.addEventListener('click', e => {
        e.stopPropagation();
    });
    
    menu.querySelector('.font-size').addEventListener('input', e => {
        cell.style.fontSize = `${e.target.value}px`;
        saveSettings();
    });
    menu.querySelector('.bg-color').addEventListener('input', e => {
        cell.style.backgroundColor = e.target.value;
        saveSettings();
    });
    menu.querySelector('.content-type').addEventListener('change', e => {
        saveSettings();
    });
    
    // Обработка ширины колонки (для заголовков)
    const columnWidthInput = menu.querySelector('.column-width');
    if (columnWidthInput) {
        columnWidthInput.addEventListener('input', e => {
            const width = e.target.value;
            if (width) {
                const columnIndex = index % columns;
                const allCells = Array.from(document.querySelectorAll('.grid-cell'));
                
                // Применяем ширину ко всем ячейкам в колонке
                for (let j = columnIndex; j < allCells.length; j += columns) {
                    allCells[j].style.width = `${width}px`;
                }
                
                // Визуальная обратная связь
                showFeedback(`Ширина колонки изменена на ${width}px`);
                saveSettings();
            }
        });
        
        // Предотвращаем закрытие при фокусе на input
        columnWidthInput.addEventListener('click', e => e.stopPropagation());
        columnWidthInput.addEventListener('focus', e => e.stopPropagation());
    }
    
    // Обработка высоты строки (для первых ячеек в строке)
    const rowHeightInput = menu.querySelector('.row-height');
    if (rowHeightInput) {
        rowHeightInput.addEventListener('input', e => {
            const height = e.target.value;
            if (height) {
                const rowStartIndex = Math.floor(index / columns) * columns;
                const allCells = Array.from(document.querySelectorAll('.grid-cell'));
                
                // Применяем высоту ко всем ячейкам в строке
                for (let j = 0; j < columns; j++) {
                    if (allCells[rowStartIndex + j]) {
                        allCells[rowStartIndex + j].style.height = `${height}px`;
                    }
                }
                
                // Визуальная обратная связь
                showFeedback(`Высота строки изменена на ${height}px`);
                saveSettings();
            }
        });
        
        // Предотвращаем закрытие при фокусе на input
        rowHeightInput.addEventListener('click', e => e.stopPropagation());
        rowHeightInput.addEventListener('focus', e => e.stopPropagation());
    }
    
    // Обработка обычной ширины ячейки
    const cellWidthInput = menu.querySelector('.cell-width');
    if (cellWidthInput) {
        cellWidthInput.addEventListener('input', e => {
            const width = e.target.value;
            cell.style.width = `${width}px`;
            if (width) {
                showFeedback(`Ширина ячейки изменена на ${width}px`);
            }
            saveSettings();
        });
        
        // Предотвращаем закрытие при фокусе на input
        cellWidthInput.addEventListener('click', e => e.stopPropagation());
        cellWidthInput.addEventListener('focus', e => e.stopPropagation());
    }
    
    // Добавляем обработчики для всех остальных элементов меню
    menu.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('click', e => e.stopPropagation());
        element.addEventListener('focus', e => e.stopPropagation());
    });
}

function showFeedback(message) {
    const status = document.getElementById('status');
    if (status) {
        status.textContent = message;
        status.style.color = '#28a745';
        status.style.fontWeight = 'bold';
        
        // Убираем сообщение через 2 секунды
        setTimeout(() => {
            status.textContent = '';
        }, 2000);
    } else {
        console.log(message);
    }
}

function setupIconClick(cell, trigger) {
    trigger.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.grid-cell.show-settings').forEach(c => {
            if (c !== cell) c.classList.remove('show-settings');
        });
        cell.classList.toggle('show-settings');
    });
}

function setupGlobalClick() {
    document.addEventListener('click', (e) => {
        // Проверяем, что клик не был внутри меню настроек
        if (!e.target.closest('.settings-menu') && !e.target.closest('.settings-trigger')) {
            document.querySelectorAll('.grid-cell').forEach(c => c.classList.remove('show-settings'));
        }
    });
}



function saveSettings() {
    const settings = {};
    document.querySelectorAll('.grid-cell').forEach(cell => {
        const idx = cell.dataset.gridIndex;
        if (!idx) return;

        settings[idx] = {
            fontSize: cell.style.fontSize || "14px",
            bgColor: cell.style.backgroundColor || "#f9f9f9",
            width: cell.style.width || "",
            height: cell.style.height || "",
        };
    });
    // Используем переменную вместо localStorage для демонстрации
    window.gridSettings = JSON.stringify(settings);
    console.log("Настройки сохранены");
}

function loadSettings() {
    const saved = window.gridSettings;
    if (!saved) return;

    const settings = JSON.parse(saved);
    document.querySelectorAll('.grid-cell').forEach(cell => {
        const idx = cell.dataset.gridIndex;
        if (!idx || !settings[idx]) return;

        const s = settings[idx];
        cell.style.fontSize = s.fontSize;
        cell.style.backgroundColor = s.bgColor;
        if (s.width) cell.style.width = s.width;
        if (s.height) cell.style.height = s.height;

        const menu = cell.querySelector('.settings-menu');
        if (menu) {
            menu.querySelector('.font-size').value = parseInt(s.fontSize);
            menu.querySelector('.bg-color').value = s.bgColor;
            
            const columnWidthInput = menu.querySelector('.column-width');
            if (columnWidthInput) {
                columnWidthInput.value = parseInt(s.width) || "";
            }
            
            const rowHeightInput = menu.querySelector('.row-height');
            if (rowHeightInput) {
                rowHeightInput.value = parseInt(s.height) || "";
            }
            
            const cellWidthInput = menu.querySelector('.cell-width');
            if (cellWidthInput) {
                cellWidthInput.value = parseInt(s.width) || "";
            }
        }
    });

    console.log("Настройки восстановлены");
}

function saveProject() {
    console.log("Сохранение проекта...");
}

function addRow() {
    const table = document.getElementById('gridTable');
    for (let i = 0; i < 3; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.contentEditable = 'true';
        table.appendChild(cell);
    }
    // Переинициализация после добавления строки
    initGridSettings();
}

function clearTable() {
    const cells = document.querySelectorAll('.grid-cell:not(.grid-header)');
    cells.forEach(cell => cell.innerHTML = '');
}

function generateSampleData() {
    const cells = document.querySelectorAll('.grid-cell:not(.grid-header)');
    cells.forEach((cell, index) => {
        cell.innerHTML = `Тестовые данные ${index + 1}`;
    });
}

function highlightProject() {
    document.querySelectorAll('.grid-cell:not(.grid-header)').forEach(cell => {
        cell.style.backgroundColor = '#ffffcc';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initGridSettings();
    // setupGridResizing(); // Убрано автоматическое изменение размеров при клике
});