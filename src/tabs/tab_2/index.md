<div class="container">
    <div class="controls">
        <button id="saveSettingsBtn">Сохранить настройки в файл</button>
    </div>
    <table class="data-table" id="dataTable">
        <thead>
            <tr id="tab_2_header_row">
                <th id="tab_2_header_topic"><div class="cell-content" contenteditable="true">Тема</div></th>
                <th id="tab_2_header_content"><div class="cell-content" contenteditable="true">Описание</div></th>
                <th id="tab_2_header_other"><div class="cell-content" contenteditable="true">Доп.</div></th>
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
                <td id="tab_2_5_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_5_topic.md')}}</div></td>
                <td id="tab_2_5_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_5_content.md')}}</div></td>
                <td id="tab_2_5_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_5_other.md')}}</div></td>
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
        await initTab("tab_2");
    } catch (error) {
        console.error("Error build:", error);
    }
});
</script>    