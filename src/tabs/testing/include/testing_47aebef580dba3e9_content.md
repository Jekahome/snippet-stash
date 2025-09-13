

для обычных юнит-тестов асинхронного кода есть крайне удобный макрос `#[tokio::test]`. 
В tokio, в том числе, можно вручную управлять временем, а в crate **tokio-test** есть примитивы для мока I/O, например.

для более глубокой проверки можно воспользоваться инструментом loom

---

**Test async function**

```toml
[dependencies]
actix-rt = "*"
```

```
#[cfg(test)]
#[allow(non_snake_case)]
mod tests {
  use super::*;
  
  #[test]
  fn test_str_len() {
    assert_eq!(str_len("x5ff"), 4);
  }

  #[actix_rt::test]
  async fn test_str_len_async() {
    assert_eq!(str_len_async("x5ff").await, 4);
  }
}
```

---

```toml
[dev-dependencies]
tokio-test = "*"
```

```
#[tokio::test]
async fn test_str_len() {
    assert_eq!(str_len("x5ff"), 4);
}
```
