

Допустим, вы работаете над проектом, используя контейнер `uuid`, который зависит от `rand`. Вы обнаружили ошибку в `rand`, и она уже исправлена, по пока не опубликована.

```toml
[dependencies]
uuid = "0.2"
```

Чтобы переопределить зависимость `rand` контейнера `uuid`, мы будем использовать `[секцию [replace]] replace-section` в `Cargo.toml`, добавив это в конце:

```toml
[replace]
"rand:0.3.14" = { git = 'https://github.com/rust-lang-nursery/rand' }
```

Посмотреть в `Cargo.lock` какую конкретно версию использует uuid библиотеке `rand:0.3.14`

Это означает, что `rand версии 0.3.14`, которую мы сейчас используем, будет заменена веткой master репозитория `rand` на GitHub.

---
 
**Устарел синтаксис replace вместо него path**

```toml
[patch.crates-io]
rustc-serialize = {path="../rustc-serialize", version="0.3.24"}
```
