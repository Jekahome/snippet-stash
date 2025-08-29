

`Cargo.toml`:

```toml
[package]
name = "adder"
version = "0.1.0"
edition = "2021"
 
[features]
default = ["others"]
some_condition = ["rand"]
others = []

[dependencies.rand]
version = "0.5"
optional = true
```

---

В качестве альтернативы `Cargo.toml` можно в `.cargo/config.toml`:

```toml
[build]
rustflags = "--cfg some_condition"
```

---- 

main.rs:
<pre><code class="language-rust">
#[cfg(feature="some_condition")]
fn conditional_function() {
    let x = rand::random::<u8>();
    println!("condition met! Use rand:{}", x);
}

#[cfg(not(feature="some_condition"))]
fn conditional_function() {
    println!("condition not! Without rand :(");
}

fn main() {
    conditional_function();
}
</code></pre>

---

```bash
$ cargo run --features some_condition

$ cargo build --features some_condition && ./target/debug/adder
$ cargo build && ./target/debug/adder
```



