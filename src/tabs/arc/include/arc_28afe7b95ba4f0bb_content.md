


<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let mut data = Arc::new(5);

    *Arc::make_mut(&mut data) += 1;         // Ничего не клонируется.
    let mut other_data = Arc::clone(&data); // Не клонирует внутренние данные
    *Arc::make_mut(&mut data) += 1;         // Клонирует внутренние данные
    *Arc::make_mut(&mut data) += 1;         // Ничего не клонируется.
    *Arc::make_mut(&mut other_data) *= 2;   // Ничего не клонируется.

    // Теперь `data` и `other_data` указывают на разные значения.
    assert_eq!(*data, 8);
    assert_eq!(*other_data, 12);
}
</code></pre>
