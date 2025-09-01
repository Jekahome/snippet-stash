

Для оптимизации не мутирующей строки при передачи между потоками нет смысла клонировать строку

Лучше клонировать Arc или &str
<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let text: String = get_string_from_somwhere();
    // мы можем использовать синтаксис `Arc::from`
    let owned_reference: Arc<_> = text.into();
    todo!("spawn threads here");
}
</code></pre>
