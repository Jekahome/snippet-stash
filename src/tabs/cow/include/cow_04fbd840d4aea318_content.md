

Поскольку тип Cow часто используется для строк, в стандартной библиотеке
имеется специальная поддержка для `Cow<'a, str>`. Этот тип позволяет выполнять преобразования в типы `String` и `&str` и обратно.
```
use std::borrow::Cow;
fn get_name() -> Cow<'static, str> {
         std::env::var("USER")
                  .map(|v| Cow::Owned(v)) // или  .map(|v| v.into())
                  .unwrap_or(Cow::Borrowed("кем бы ты ни был")) // или .unwrap_or("кем бы ты ни был".into())
}
```

---

Если s и так в нижнем регистре — экономим аллокацию. Если строка уже в lowercase, то так и оставить иначе отдать String
```
use std::borrow::Cow;
fn to_lowercase<'a>(s: &'a str) -> Cow<'a, str> {
    if s.chars().all(char::is_lowercase) {
         Cow::Borrowed(s)
    } else {
         Cow::Owned(s.to_lowercase())
    }
} 
```
**Минусы**: тоскать ifetime параметр
