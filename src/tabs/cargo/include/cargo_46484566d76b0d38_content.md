

```
.
├── Cargo.lock
├── Cargo.toml
├── src/
│   ├── lib.rs
│   ├── main.rs
│   └── bin/
│       ├── named-executable.rs
│       ├── another-executable.rs
│       └── multi-file-executable/
│           ├── main.rs
│           └── some_module.rs
├── benches/
│   ├── large-input.rs
│   └── multi-file-bench/
│       ├── main.rs
│       └── bench_module.rs
├── examples/
│   ├── simple.rs
│   └── multi-file-example/
│       ├── main.rs
│       └── ex_module.rs
└── tests/
    ├── some-integration-tests.rs
    └── multi-file-test/
        ├── main.rs
        └── test_module.rs

```

* `Cargo.toml` и `Cargo.lock` размещается в корневой директории вашего проекта.
* Исходный код отправляется в директорию `src`.
* Стандартный файл библиотеки расположен по адресу `src/lib.rs`.
* Стандартный исполняемый файл находится по адресу `src/main.rs`.
* Другие исполняемые файлы могут быть расположены в `src/bin/*.rs`.
* Интеграционные тесты находятся в директории tests (юнит тесты в том файле, который они тестируют).
* Исполняемые примеры располагаются в директории `examples`.
* Бенчмарки хранятся в директории `benches`
* Скомпилированный исполняемый файл в `target/debug/<name project>` или `target/release/<name project>`
