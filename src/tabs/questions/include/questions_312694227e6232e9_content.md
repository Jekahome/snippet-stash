

```	
# показывает все возможные цели компиляции (targets), которые поддерживает установленная версия Rust, и статус для каждой.
$ rustup target list

# install target:
$ rustup target add x86_64-unknown-linux-gnu
$ rustup target add thumbv7m-none-eabi
$ rustup target add wasm32-unknown-unknown
$ rustup target add wasm32-unknown-unknown --toolchain nightly

# удалить target
$ rustup target remove wasm32-unknown-unknown

# установить компонеты
$ rustup component add rustfmt --toolchain nightly-x86_64-unknown-linux-gnu
$ rustup component add clippy --toolchain stable-x86_64-unknown-linux-gnu

# show targets:
$ rustup component list --installed

# Показывает текущую конфигурацию rustup 
## Активный toolchain (stable, beta, nightly)
## Где установлен Rust
## Какие компоненты активны (rustc, cargo, clippy, rustfmt)
## Какие targets установлены
$ rustup show
```

---

```
$ rustc --version --verbose
$ rustup show
Default host: x86_64-unknown-linux-gnu
rustup home:  /home/jeka/.rustup

x86_64-unknown-linux-gnu которая включает 
архитектуру процессора (x86_64)
производителя (unknown),
операционную систему (linux) 
ABI (gnu)


installed toolchains
------------------- 

stable-x86_64-unknown-linux-gnu (default)
nightly-x86_64-unknown-linux-gnu

installed targets for active toolchain
------------------- 

thumbv7m-none-eabi
wasm32-unknown-unknown
x86_64-unknown-linux-gnu

active toolchain
------------------- 

stable-x86_64-unknown-linux-gnu (default)
rustc 1.72.0 (5680fa18f 2023-08-23)
```
