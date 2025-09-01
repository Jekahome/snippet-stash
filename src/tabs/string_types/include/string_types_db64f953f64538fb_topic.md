

**функция принимает String или &str**
(пример для обобщеннения)

`impl Into<String>`

`impl AsRef<str>`

`impl From<&str> for String` "auto implies" => `Into<String> for &str`
