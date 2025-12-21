

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

```

Проверка установленных toolchain в системе:
```
$ rustup toolchain list

    stable-x86_64-unknown-linux-gnu (active, default)
    nightly-x86_64-unknown-linux-gnu

```

```

# Переключиться на nightly
$ rustup override set nightly

# Переключиться на stable 
$ rustup override set stable

```

**Или создать в проекте файл rust-toolchain.toml**:
```toml
[toolchain]
channel = "nightly"
components = ["rustfmt", "clippy"]
targets = ["x86_64-unknown-linux-gnu"]
```

---

**Можно еще точнее, установить конкретную версию, чтобы сборка не ломалась из-за обновлений nightly**:

 ```
rustup toolchain install nightly-2025-01-10
```

Файл rust-toolchain.toml:
```toml
[toolchain]
channel = "nightly-2025-01-10"
components = ["rustfmt", "clippy"]
targets = ["x86_64-unknown-linux-gnu"]
```
* При входе в каталог проекта rustup автоматически переключится на nightly
* cargo build, cargo run, rustc будут использовать nightly
* Версия фиксируется на уровне проекта, а не глобально
