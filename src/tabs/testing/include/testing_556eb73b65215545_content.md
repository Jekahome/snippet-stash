

Практика в Rust, обычно используют оба подхода, но для разных целей:
* Fakes - для репозиториев, внешних сервисов, сложных зависимостей
* Mocks - для проверки специфических взаимодействий между компонентами


Fake - это рабочая, но упрощенная реализация, обычно для изоляции от внешних зависимостей:
```rust
// Настоящая база данных
struct Database { /* сложная логика */ }

// Fake-версия для тестов
struct FakeDatabase {
    data: HashMap<String, String>,
}

impl FakeDatabase {
    fn new() -> Self {
        Self { data: HashMap::new() }
    }
    
    // Такие же методы как у настоящей БД, но работают в памяти
    fn save(&mut self, key: &str, value: &str) {
        self.data.insert(key.to_string(), value.to_string());
    }
    
    fn load(&self, key: &str) -> Option<&str> {
        self.data.get(key).map(|s| s.as_str())
    }
}
```

Mock - это "шпион", который записывает вызовы и проверяет взаимодействия:
```rust
use mockall::automock;

#[automock]
trait EmailService {
    fn send_email(&self, to: &str, subject: &str) -> Result<(), String>;
}

// В тестах
let mut mock_email = MockEmailService::new();
mock_email.expect_send_email()
    .times(1)
    .returning(|_, _| Ok(()));

// Тестируем, что send_email был вызван ровно 1 раз
```
