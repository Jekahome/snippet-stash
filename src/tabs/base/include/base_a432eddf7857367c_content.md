

Атрибут, который убирает предупреждения компилятора о неиспользуемом коде. 

В начале файла.

В продакшн коде его удалить надо, а в dev можно ставить
<pre><code class="language-rust">
fn used_function() {}

// `#[allow(dead_code)]` - атрибут, который убирает проверку на неиспользуемый код
#[allow(dead_code)]
fn unused_function() {}

fn noisy_unused_function() {}
// ИСПРАВЬТЕ ^ Добавьте атрибут `dead_code`, чтобы убрать предупреждение

fn main() {
    used_function();
}
</code></pre>
