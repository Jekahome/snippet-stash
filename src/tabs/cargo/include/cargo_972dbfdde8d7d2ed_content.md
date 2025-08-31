

```
.cargo/ - Конфигурация груза локального проекта , может содержать . config.toml

/projects/foo/.cargo/config.toml
/projects/.cargo/config.toml
$HOME/.cargo/config.toml

# быстрая компиляция
[registries.crates-io] 
protocol = "sparse"

[doc]
browser = "chromium"          # browser to use with `cargo doc --open`

[env]
# Set ENV_VAR_NAME=value for any process run by Cargo
ENV_VAR_NAME = "value"
# Set even if already present in environment
ENV_VAR_NAME_2 = { value = "value", force = true }
```
