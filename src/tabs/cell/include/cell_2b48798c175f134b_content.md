


<pre><code class="language-rust">
use std::sync::OnceLock;

// Глобальная переменная с ленивой инициализацией
static CONFIG: OnceLock<String> = OnceLock::new();

fn get_config() -> &'static str {
    CONFIG.get_or_init(|| {
        println!("Инициализация конфигурации...");
        String::from("Configuration data")
    })
}
fn main() {
    // Первое обращение вызовет инициализацию
    let config = get_config();
    println!("Config: {}", config);

    // Последующие обращения не вызовут инициализацию
    let config_again = get_config();
    println!("Config again: {}", config_again);
}
</code></pre>

---

**Сходство с RefCell**
<pre><code class="language-rust">
fn main(){
    // RefCell - внутренняя изменяемость с проверкой во время выполнения
    use std::cell::RefCell;
    let cell = RefCell::new(None);
    *cell.borrow_mut() = Some(42); // Мутация через неизменяемую ссылку

    // OnceLock - похожая концепция внутренней изменяемости с проверкой во время выполнения, но для однократной инициализации!
    use std::sync::OnceLock;
    let lock = OnceLock::new();
    lock.set(42).unwrap(); // Однократная инициализация
}
</code></pre>
