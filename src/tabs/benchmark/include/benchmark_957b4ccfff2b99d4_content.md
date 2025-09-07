

Убедитесь, что ваш Cargo.toml настроен на использование параллельной компиляции:
```toml
[profile.dev]
codegen-units = 16  # Default is 16, adjust as needed
incremental = true  # Enable incremental compilation

[profile.release]
codegen-units = 1  # Reduce for better optimizations
incremental = false  # Disable for final release builds
lto = true  # Enable Link Time Optimization
```
