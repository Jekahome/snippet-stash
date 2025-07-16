<div class="container">
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
            <tr id="tab_2_4bd6e4fdbaac5925">
                <td id="tab_2_4bd6e4fdbaac5925_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_4bd6e4fdbaac5925_topic.md')}}</div></td>
                <td id="tab_2_4bd6e4fdbaac5925_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_4bd6e4fdbaac5925_content.md')}}</div></td>
                <td id="tab_2_4bd6e4fdbaac5925_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_4bd6e4fdbaac5925_other.md')}}</div></td>
            </tr>
            <tr id="tab_2_6610bf3fe270bb31">
                <td id="tab_2_6610bf3fe270bb31_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_6610bf3fe270bb31_topic.md')}}</div></td>
                <td id="tab_2_6610bf3fe270bb31_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_6610bf3fe270bb31_content.md')}}</div></td>
                <td id="tab_2_6610bf3fe270bb31_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_6610bf3fe270bb31_other.md')}}</div></td>
            </tr> 
            <tr id="tab_2_2">
                <td id="tab_2_2_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_2_topic.md')}}</div></td>
                <td id="tab_2_2_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_2_content.md')}}</div></td>
                <td id="tab_2_2_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_2_other.md')}}</div></td>
            </tr>
            <tr id="tab_2_770661bc6d8844ac">
                <td id="tab_2_770661bc6d8844ac_topic"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_770661bc6d8844ac_topic.md')}}</div></td>
                <td id="tab_2_770661bc6d8844ac_content"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_770661bc6d8844ac_content.md')}}</div></td>
                <td id="tab_2_770661bc6d8844ac_other"><div class="cell-content" contenteditable="true">{{include('src/tabs/tab_2/include/tab_2_770661bc6d8844ac_other.md')}}</div></td>
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