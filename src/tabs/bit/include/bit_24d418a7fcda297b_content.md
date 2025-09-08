


<pre><code class="language-rust">
use bitflags::bitflags;

// Определяем набор флагов
bitflags! {
    struct Permissions: u32 {
        const READ = 0b0001;    // Бит 0
        const WRITE = 0b0010;   // Бит 1
        const EXECUTE = 0b0100; // Бит 2
        const DELETE = 0b1000;  // Бит 3
    }
}
fn main() {
    // Устанавливаем начальные права
    let mut user_permissions = Permissions::READ | Permissions::WRITE;

    // Проверяем наличие флага
    if user_permissions.contains(Permissions::READ) {
        println!("User can read.");
    }

    // Добавляем право на выполнение
    user_permissions.insert(Permissions::EXECUTE);

    // Убираем право на запись
    user_permissions.remove(Permissions::WRITE);

    // Переключаем право на удаление
    user_permissions.toggle(Permissions::DELETE);

    // Печатаем результат
    println!("Permissions: {:?}", user_permissions);

    // Проверяем комбинацию флагов
    if user_permissions.contains(Permissions::READ | Permissions::EXECUTE) {
        println!("User has read and execute permissions.");
    }
}
</code></pre>
