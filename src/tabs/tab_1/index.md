<div class="container">
    <table class="data-table" id="dataTable">
        <thead>
            <tr id="tab_1_header_row">
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