

**Пример (хэш пароля с Argon2)**
<pre><code class="language-rust">
use argon2::{self, Config};

fn main() {
    let password = b"super_secret";
    let salt = b"random_salt";

    // Хэшируем пароль
    let config = Config::default();
    let hash = argon2::hash_encoded(password, salt, &config).unwrap();

    println!("Хэш пароля: {}", hash);

    // Проверяем пароль
    let is_valid = argon2::verify_encoded(&hash, password).unwrap();
    println!("Пароль верный? {}", is_valid);
}
</code></pre>
