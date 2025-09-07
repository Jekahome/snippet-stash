

```
cargo install sccache
export RUSTC_WRAPPER=sccache
export CARGO_BUILD_JOBS=$(nproc)
```

File Cargo.toml:
```toml
build = "build.rs"

[profile.dev]
codegen-units = 16
incremental = true

[profile.release]
codegen-units = 1
incremental = false
lto = true
```

File build.rs:
<pre><code class="language-rust">
use std::{env, thread};
fn main() -> Result<(), Box<dyn std::error::Error>> {
    env::set_var("RUSTC_WRAPPER", "sccache");
    if let Ok(par) = thread::available_parallelism() {
        env::set_var("CARGO_BUILD_JOBS", par.get().to_string());
    }
   Ok(())
} 
</code></pre>


File rust-toolchain.toml:
```toml
[toolchain]
channel = "stable"  
components = ["sccache"]
profile = "minimal" 
```



