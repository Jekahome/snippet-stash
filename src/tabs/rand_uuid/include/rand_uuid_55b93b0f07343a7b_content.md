


<pre><code class="language-rust">
use uuid::Uuid;

fn main() {
    // Генерация случайного UUID v4
    let id = Uuid::new_v4();
    println!("UUID: {}", id);
    
    // Парсинг UUID из строки
    let parsed = Uuid::parse_str("550e8400-e29b-41d4-a716-446655440000").unwrap();
    
    // Конкретные версии UUID
    let v1 = Uuid::new_v1(); // На основе времени
    let v3 = Uuid::new_v3(); // MD5 хэш
    let v5 = Uuid::new_v5(); // SHA-1 хэш
}
</code></pre>
