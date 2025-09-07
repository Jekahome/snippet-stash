

```toml
# The development profile, used for `cargo build`.
[profile.dev]
opt-level = 0       # Контролирует уровень оптимизации, установлен на минимальный/ controls the `--opt-level` the compiler builds with
debug = true       # Включает генерацию отладочной информации `-g`
rpath = false       # Отключает передачу `-C rpath` компилятору
lto = false            # Отключает оптимизацию на этапе связывания (Link Time Optimization) / controls `-C lto` for binaries and staticlibs
debug-assertions = true # Включает отладочные проверки (assertions)
codegen-units = 1  # Устанавливает количество юнитов кодогенерации на 1 `-C codegen-units`
                   # `codegen-units` is ignored when `lto = true`
panic = 'unwind'   # panic strategy (`-C panic=...`), can also be 'abort'
 

# The release profile, used for `cargo build --release`.
[profile.release]
opt-level = 3
debug = false
rpath = false
lto = false
debug-assertions = false
codegen-units = 1
panic = 'unwind'

# The testing profile, used for `cargo test`.
[profile.test]
opt-level = 0
debug = true
rpath = false
lto = false
debug-assertions = true
codegen-units = 1
panic = 'unwind'

# The benchmarking profile, used for `cargo bench`.
[profile.bench]
opt-level = 3
debug = false
rpath = false
lto = false
debug-assertions = false
codegen-units = 1
panic = 'unwind'

# The documentation profile, used for `cargo doc`.
[profile.doc]
opt-level = 0
debug = true
rpath = false
lto = false
debug-assertions = true
codegen-units = 1
panic = 'unwind'
```
