

#### Fuzzing генерация не правильных данных

* cargo [afl](https://crates.io/crates/afl)
* [Фаззинг](https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B7%D0%B7%D0%B8%D0%BD%D0%B3)
* [Rust Fuzz Book](https://rust-fuzz.github.io/book/cargo-fuzz.html)
* crate [cargo-fuzz](https://docs.rs/cargo-fuzz)
* crate [honggfuzz](https://docs.rs/honggfuzz)
* [effective-rust/fuzz-testing](https://www.lurklurk.org/effective-rust/testing.html#fuzz-testing)
* [how-to-organize-rust-tests](https://blog.logrocket.com/how-to-organize-rust-tests/)
* [youtube/cargo afl](https://www.youtube.com/watch?v=GXxH01b003E)
* [complete-guide-to-testing-code-in-rust](https://zerotomastery.io/blog/complete-guide-to-testing-code-in-rust/)
* [Cargo Fuzz](https://github.com/rust-fuzz/cargo-fuzz) - Обертка командной строки для использования libFuzzer. Прост в использовании, не нужно перекомпилировать LLVM!
* [honggfuzz-rs](https://github.com/rust-fuzz/honggfuzz-rs) - Фаззер, разработанный Google.
* [afl.rs](https://github.com/rust-fuzz/afl.rs) - Позволяет запускать фаззер AFL для кода, написанного на языке программирования Rust.
* [cargo-libafl](https://github.com/AFLplusplus/cargo-libafl) - Фаззер, поддерживаемый LibAFL
* [fuzzcheck](https://github.com/loiclec/fuzzcheck-rs) - на наличие нечеткости, экспериментальный движок фаззинга, который напрямую мутирует структуры данных Rust, минуя преобразование в/из байтовых строк
* [QuickCheck](https://github.com/BurntSushi/quickcheck) - это способ проведения тестирования на основе свойств с использованием случайно сгенерированных входных данных.
* [Proptest](https://github.com/altsysrq/proptest) - это фреймворк для тестирования свойств (семейство QuickCheck), созданный на основе фреймворка Hypothesis для Python.
* [rusty-radamsa](https://github.com/microsoft/rusty-radamsa) - Radamsa портирован на Rust. Fuzzer с хорошими мутаторами, но без руководства по покрытию.
