<div class="container">
    <div class="controls">
        <button id="saveSettingsBtn">Сохранить настройки в файл</button>
    </div>
    <table class="data-table" id="dataTable">
        <thead>
            <tr id="tab_2_header_row">
                <th id="tab_1_header_topic"><div class="cell-content" contenteditable="true">Тема</div></th>
                <th id="tab_1_header_content"><div class="cell-content" contenteditable="true">Описание</div></th>
                <th id="tab_1_header_other"><div class="cell-content" contenteditable="true">Доп.</div></th>
            </tr>
        </thead>
        <tbody>
            <tr id="tab_1_1">
                <td id="tab_1_1_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_1/include/tab_1_1_topic.md')}}</div></td>
                <td id="tab_1_1_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_1/include/tab_1_1_content.md')}}</div></td>
                <td id="tab_1_1_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_1/include/tab_1_1_other.md')}}</div></td>
            </tr>
        </tbody>
    </table>
</div>
<!-- Модальное окно -->
<div id="textModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Редактирование текста</h3>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <textarea id="modalTextEditor" class="modal-text-editor" placeholder="Введите ваш текст здесь..."></textarea>
        <div class="modal-footer">
            <button class="modal-cancel-btn" onclick="closeModal()">Отмена</button>
            <button class="modal-save-btn" onclick="saveTextModal()">Сохранить</button>
        </div>
    </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.globalScriptReady; 
        await initTab("tab_1");
    } catch (error) {
        console.error("Error build:", error);
    }
});
</script>    