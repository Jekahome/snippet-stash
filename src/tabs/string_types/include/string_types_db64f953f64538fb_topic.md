

**функция принимает String или &str**
(пример для обобщеннения)

`impl Into<String>`

`impl AsRef<str>`

`impl From<&str> for String` "auto implies" => `Into<String> for &str`

[creating-a-rust-function-that-accepts-string-or-str](https://hermanradtke.com/2015/05/06/creating-a-rust-function-that-accepts-string-or-str.html/)
