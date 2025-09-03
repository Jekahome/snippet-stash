

Что касается внутренней библиотеки, я вообще избегаю интеграционных тестов. 

Вместо этого я использую модульные тесты

```
src/
  lib.rs
  tests.rs
  tests/
     mod.rs
     integration_tests/
        foo.rs
        mod.rs
        bar.rs
     
# где: 
lib.rs
  #[cfg(test)]
  mod tests;

mod.rs:
  #[cfg(test)]
  mod integration_tests;

integration_tests/mod.rs:
  #[cfg(test)]
  mod foo;
  #[cfg(test)]
  mod bar;
```

Запуск:
```
$ cargo run tests integration_tests
```
