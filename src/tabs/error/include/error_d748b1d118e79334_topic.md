

* **ok_or()** - Преобразует `Option<T>` в `Result<T, E>`, Some(v) в Ok(v) и None в Err(err) 
(**ok_or_else** предпочтительней, ленивое)

* **transpose**`(self) -> Result<Option<T>, E>` - Транспонирует Option из Result 
