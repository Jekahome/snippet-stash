

Инкрементальная компиляция может значительно ускорить повторные сборки:
```toml
[profile.dev]
incremental = true

[profile.release]
incremental = false
```
