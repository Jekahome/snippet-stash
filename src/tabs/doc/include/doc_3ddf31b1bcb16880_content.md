

**rust** - Код компилируется и выполняется во время запуска команды: `cargo test`

**should_panic** - Проверяет, что код паникует. Тест проходит если происходит panic.

**no_run** - Код только компилируется, но не выполняется.

**ignore** - Полностью игнорирует блок кода в тестах (не компилируется и не запускается).

**text** - Обрабатывается как обычный текст, не как код.

**edition2015, edition2018, edition2021, edition2025** - Специфичные редакции

**compile_fail** - используется для примеров кода, которые должны не скомпилироваться.

---

Пример с **should_panic**, код запускается и должен вызвать panic:
```
/// Validates input parameters.
///
/// # Examples
///
/// &#96;&#96;&#96;should_panic(expected = "Input cannot be empty"),edition2025
/// use my_crate::validate_input;
///
/// validate_input(""); // Panics with specific message
/// &#96;&#96;&#96;
///
/// &#96;&#96;&#96;should_panic(expected = "length must be at least")
/// validate_input("short"); // Different panic message
/// &#96;&#96;&#96;
pub fn validate_input(input: &str) {
    if input.is_empty() {
        panic!("Input cannot be empty");
    }
    if input.len() < 10 {
        panic!("Input length must be at least 10 characters");
    }
}
```


Пример с **ignore** когда тестирование занимает много времени:
```
/// Data processing pipeline.
///
/// # Examples
///
/// &#96;&#96;&#96;ignore
/// use my_crate::DataProcessor;
///
/// // Игнорируем - занимает слишком много времени
/// let processor = DataProcessor::new();
/// processor.process_large_dataset("huge_file.csv"); // 30+ минут
/// &#96;&#96;&#96;
///
/// Test with small dataset:
/// &#96;&#96;&#96;
/// use my_crate::DataProcessor;
///
/// let processor = DataProcessor::new();
/// let result = processor.process_small_dataset("test_data.csv");
/// assert!(result.is_ok());
/// &#96;&#96;&#96;
```

Пример с **no_run**  при наличии внешних зависимостей (интеграционное тестирование):
```
/// File system operations.
///
/// # Examples
///
/// &#96;&#96;&#96;no_run
/// use my_crate::FileProcessor;
/// use std::fs;
///
/// // Не запускаем - создает реальные файлы
/// let processor = FileProcessor::new("data.txt");
/// processor.process(); // Создает/изменяет файлы
/// &#96;&#96;&#96;
///
/// Test with in-memory filesystem:
/// &#96;&#96;&#96;
/// use my_crate::{FileProcessor, MemoryFileSystem};
///
/// let fs = MemoryFileSystem::new();
/// let processor = FileProcessor::with_filesystem(fs);
/// processor.process(); // Работает в памяти
/// &#96;&#96;&#96;
```

Пример с **compile_fail**,  если мы хотим показать ошибочный пример — нужно явно сказать, что этот код должен не компилироваться. Документация показывает пример неправильного кода. При сборке документации cargo test проверяет, что этот код реально не компилируется. Если ошибка вдруг исчезнет (например, после изменения компилятора) — тест упадёт, и автор заметит.
```
/// &#96;&#96;&#96;compile_fail
/// let x: i32 = "строка"; // типы не совпадают
/// &#96;&#96;&#96;
```
