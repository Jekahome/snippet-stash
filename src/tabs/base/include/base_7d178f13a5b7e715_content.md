

`Cargo.toml`:

```toml
[features]
test = []  В Cargo не обязательно заносить запуск и так отработает если передать флаг --features
```
---

<pre><code class="language-rust">
#[cfg(feature = "test")]
use serde::{Deserialize, Deserializer, Serialize};

#[derive(Debug)]
#[cfg_attr(feature = "test", derive(PartialEq, Serialize))]
pub struct UserEmail(String);

#[cfg(feature = "test")]
impl<'de> Deserialize<'de> for UserEmail {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let email = String::deserialize(deserializer)?;

        UserEmail::new(email).ok_or_else(|| {
            serde::de::Error::custom("`email` is not valid".to_string())
        })
    }
}
</code></pre>

---

Запуск

```bash
cargo test  --features "test"
```

---
 
<details>
<summary>run-additional-tests-by-using-a-feature-flag-to-cargo-test</summary>

[run-additional-tests-by-using-a-feature-flag-to-cargo-test](https://stackoverflow.com/questions/48583049/run-additional-tests-by-using-a-feature-flag-to-cargo-test)

Without a workspace

`Cargo.toml`:

```toml
[package]
name = "feature-tests"
version = "0.1.0"
authors = ["An Devloper <an.devloper@example.com>"]

[features]
network = []
filesystem = []

[dependencies]
src/lib.rs
```

<pre><code class="language-rust">
#[test]
#[cfg_attr(not(feature = "network"), ignore)]
fn network() {
    panic!("Touched the network");
}

#[test]
#[cfg_attr(not(feature = "filesystem"), ignore)]
fn filesystem() {
    panic!("Touched the filesystem");
}
</code></pre>

Output:

```bash
$ cargo test

running 2 tests
test filesystem ... ignored
test network ... ignored

$ cargo test --features network

running 2 tests
test filesystem ... ignored
test network ... FAILED

$ cargo test --features filesystem

running 2 tests
test network ... ignored
test filesystem ... FAILED
(some output removed to better show effects)
```

With a workspace

Layout:

```
.
├── Cargo.toml
├── feature-tests
│   ├── Cargo.toml
│   ├── src
│   │   └── lib.rs
├── src
│   └── lib.rs
feature-tests contains the files from the first section above.
```

`Cargo.toml`:

```toml
[package]
name = "workspace"
version = "0.1.0"
authors = ["An Devloper <an.devloper@example.com>"]

[features]
filesystem = ["feature-tests/filesystem"]
network = ["feature-tests/network"]

[workspace]

[dependencies]
feature-tests = { path = "feature-tests" }
```

Output:

```bash
$ cargo test --all

running 2 tests
test filesystem ... ignored
test network ... ignored

$ cargo test --all --features=network

running 2 tests
test filesystem ... ignored
test network ... FAILED
(some output removed to better show effects)
```

</details>

 

 
