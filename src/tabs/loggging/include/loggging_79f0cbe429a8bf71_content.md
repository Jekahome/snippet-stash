

```
# Показывает info и выше:
$ RUST_LOG=info cargo run

# Показывает debug и выше:
$ RUST_LOG=debug cargo run`

# trace для cli_args, debug для os:
$ RUST_LOG=cli_args=trace,os=debug cargo run
```
