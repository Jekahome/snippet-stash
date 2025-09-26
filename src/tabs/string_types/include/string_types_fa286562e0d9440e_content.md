

`Vec<char>` и `String` имеют разные преимущества в зависимости от задачи. Вот сравнение:

## 1. Производительность операций

### `Vec<char>` лучше для:
```rust
fn main() {
    let text = "Hello 世界 🦀";
    let chars_vec: Vec<char> = text.chars().collect();
    let string = text.to_string();
    
    // Доступ по индексу - O(1) vs O(n)
    println!("3-й символ: {:?}", chars_vec.get(3)); // Быстро
    // У String доступ по индексу символа медленный
    
    // Замена символа по индексу
    let mut chars = chars_vec.clone();
    chars[3] = 'X'; // Быстро
    println!("После замены: {:?}", chars);
    
    // Удаление символа по индексу
    chars.remove(3); // Быстро
    println!("После удаления: {:?}", chars);
    
    // Вставка символа
    chars.insert(3, '!'); // Быстро
    println!("После вставки: {:?}", chars);
}
```

### `String` лучше для:
```rust
fn main() {
    let s1 = "Hello".to_string();
    let s2 = " World".to_string();
    
    // Конкатенация - очень эффективна
    let combined = s1 + &s2;
    println!("{}", combined);
    
    // Срезы байт
    let text = "Hello 世界";
    let byte_slice = &text[0..5]; // Быстро
    println!("{}", byte_slice);
}
```

## 2. Использование памяти

```rust
fn main() {
    let text = "Hello";
    let chars_vec: Vec<char> = text.chars().collect();
    let string = text.to_string();
    
    println!("String размер: {} байт", std::mem::size_of_val(&string));
    println!("Vec<char> размер: {} байт", std::mem::size_of_val(&chars_vec));
    println!("String capacity: {}", string.capacity());
    println!("Vec<char> capacity: {}", chars_vec.capacity());
    
    // char всегда 4 байта, но String хранит UTF-8
    println!("'A' как char: {} байт", std::mem::size_of::<char>());
    println!("'A' в UTF-8: {} байт", 'A'.len_utf8());
    println!("'世' как char: {} байт", std::mem::size_of::<char>());
    println!("'世' в UTF-8: {} байт", '世'.len_utf8());
}
```

## 3. Практические сценарии

### Когда использовать `Vec<char>`:
```rust
fn reverse_string(text: &str) -> String {
    let chars: Vec<char> = text.chars().collect();
    chars.iter().rev().collect() // Простое реверсирование
}

fn process_individual_chars(text: &str) {
    let chars: Vec<char> = text.chars().collect();
    
    // Множественные операции с индексами
    for i in 0..chars.len() {
        if i % 2 == 0 {
            // Легко работать с конкретными позициями
            println!("Символ на позиции {}: {}", i, chars[i]);
        }
    }
    
    // Фильтрация с сохранением индексов
    let filtered: Vec<(usize, char)> = chars.iter()
        .enumerate()
        .filter(|(_, &c)| c.is_alphabetic())
        .map(|(i, &c)| (i, c))
        .collect();
}

fn main() {
    println!("Реверс: {}", reverse_string("Hello 世界"));
    process_individual_chars("Hello123");
}
```

### Когда использовать `String`:
```rust
fn build_string_parts() -> String {
    let mut result = String::new();
    
    // Эффективное построение из частей
    result.push_str("Hello");
    result.push(' ');
    result.push_str("世界");
    result.push(' ');
    result.push('🦀');
    
    result
}

fn string_operations() {
    let text = "Hello World 世界".to_string();
    
    // Эффективные операции со строками
    let lowercase = text.to_lowercase();
    let replaced = text.replace("World", "Rust");
    let substring = &text[6..11]; // "World"
    
    println!("{}", lowercase);
    println!("{}", replaced);
    println!("{}", substring);
}

fn main() {
    println!("{}", build_string_parts());
    string_operations();
}
```

## 4. Сравнение производительности

```rust
use std::time::Instant;

fn main() {
    let text = "a".repeat(10000);
    
    // Тест String
    let start = Instant::now();
    let string = text.clone();
    for _ in 0..1000 {
        let _ = string.chars().nth(5000); // Медленно
    }
    println!("String access: {:?}", start.elapsed());
    
    // Тест Vec<char>
    let start = Instant::now();
    let chars: Vec<char> = text.chars().collect();
    for _ in 0..1000 {
        let _ = chars.get(5000); // Быстро
    }
    println!("Vec<char> access: {:?}", start.elapsed());
}
```

## 5. Вывод: когда что использовать

### `Vec<char>` лучше когда:
- **Частый доступ по индексу** к отдельным символам
- **Множественные модификации** (вставка, удаление, замена)
- **Алгоритмы**, требующие случайного доступа к символам
- **Работа с символами как с отдельными сущностями**

### `String` лучше когда:
- **Чтение и вывод** текста
- **Конкатенация** и построение строк
- **Работа со срезами** байт
- **Использование стандартных методов** строк (поиск, замена и т.д.)
- **Экономия памяти** (особенно для ASCII текста)

### Гибридный подход:
```rust
fn efficient_processing(text: &str) -> String {
    // Конвертируем в Vec<char> для сложных операций
    let mut chars: Vec<char> = text.chars().collect();
    
    // Быстрые операции с индексами
    for i in 0..chars.len() {
        if i % 3 == 0 {
            chars[i] = chars[i].to_uppercase().next().unwrap();
        }
    }
    
    // Возвращаем как String для дальнейшего использования
    chars.into_iter().collect()
}
```
