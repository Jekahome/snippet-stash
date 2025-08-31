

File test_lib/Cargo.toml:

```toml
[workspace]
members = [
    "bin_world",
    "hello_world",
]
```
 
**`test_lib/bin_world`** (это бинарный проект)

File test_lib/bin_world/src/main.rs :
```
use hello_world;
fn main() {
    println!("Hello, world! {}",hello_world::foo::Var);
}
```

File test_lib/bin_world/Cargo.toml  (подключает библиотеку hello_world из workspace)

```toml
[dependencies]
hello_world = { path = "../hello_world" }
```
 
**`test_lib/hello_world`** (это библиотека)
 
File test_lib/hello_world/src/lib.rs:
```
pub mod foo;
```

File test_lib/hello_world/src/foo.rs:
```
pub const Var:i32 = 9;
```

Сборка и запуск:
```
../test_lib $ cargo build

../test_lib $ cargo run -p bin_world  // запуск бинарного проекта
```
