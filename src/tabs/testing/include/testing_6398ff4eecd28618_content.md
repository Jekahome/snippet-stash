

Файл ex/src/lib.rs:
<pre><code class="language-rust">
    use std::result::Result;  
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
    fn sqrt(number: f64) -> Result<f64, String> { <<<--- эту приватную функция можно тестировать только в самом модуле
        if number >= 0.0 {
            Ok(number.powf(0.5))
        } else {
            Err("negative floats don't have square roots".to_owned())
        }
    }
</code></pre>

Файл ex/Cargo.toml:
```toml
[package]
name = "ex"

[[test]]
name = "integration"
path = "tests/lib.rs"
```

Для тестирования в папке tests должен быть любой файл с тестами 

Файл ex/tests/lib.rs:
<pre><code class="language-rust">
extern crate ex;
mod function; // подключим еще одну папку с тестами
#[cfg(test)]
mod test{
    use ex::{add};
    #[test]
    fn test_add() {
        assert_eq!(add(1, 2), 3);
    }
}
</code></pre>

Файл  ex/tests/function/mod.rs: (файл роутер подключает все файлы в папке)
```
  mod integration_test;
```

Файл  ex/tests/function/integration_test.rs:
<pre><code class="language-rust">
    use ex;// `extern crate ex;` уже был во входном файле
    #[test]
    fn test_add() {
        // using common code.
        assert_eq!(ex::add(3, 2), 6);
    }
</code></pre>

Запуск
```
$ cargo test --test integration
```

