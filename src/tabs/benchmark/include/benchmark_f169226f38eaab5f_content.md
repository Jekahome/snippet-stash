

The best way is the following:

0. cargo install samply

1. Create a global cargo profile called profiling, see below how.
   To create the profiling cargo profile, create a text file at `~/.cargo/config.toml` with the following content:

```toml
[profile.profiling]
inherits = "release"
debug = true
```

2. Compile with `cargo build --profile profiling`

3. Record with samply record `./target/profiling/yourrustprogram`
