

Для точной версии указывается его `commit`

```toml
[dependencies]
rand = { git = "https://github.com/rust-lang-nursery/rand.git", rev = "9f35b8e" }
```

но это накладно следить за `SHA-1` каждый раз, когда мы хотим обновить нашу библиотеку. Это утомительно и чревато ошибками.

Как это решает cargo.lock за нас, когда у нас есть:
```toml
[package]
name = "hello_world"
version = "0.1.0"

[dependencies]
rand = { git = "https://github.com/rust-lang-nursery/rand.git" }
```

Cargo возьмет последний коммит и запишет эту информацию в наш, `Cargo.lock`:

```toml
[[package]]
name = "hello_world"
version = "0.1.0"
dependencies = [
 "rand 0.1.0 (git+https://github.com/rust-lang-nursery/rand.git#9f35b8e439eeedd60b9414c58f389bdc6a3284f9)",
]

[[package]]
name = "rand"
version = "0.1.0"
source = "git+https://github.com/rust-lang-nursery/rand.git#9f35b8e439eeedd60b941
```

Теперь, когда вы передаете свой пакет кому-то другому, он будет использовать тот же самый `SHA`, даже если мы не указали его в нашем `Cargo.toml`

