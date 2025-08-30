

```
Nightly

# проверим, что ночной набор инструментов был успешно установлен
rustup toolchain list | grep nightly / rust toolchain  файл для фиксации версии компилятора

# Установка точной версии
$ rustup install nightly-<yyyy-MM-dd>

# Переход на более раннюю версию Rust Nightly
$ rustup uninstall nightly
$ rustup install nightly-<yyyy-MM-dd>
$ rustup target add wasm32-unknown-unknown --toolchain nightly-<yyyy-MM-dd>

# Переключиться на nightly
$ rustup override set nightly

# Переключиться на stable 
$ rustup override set stable
```
