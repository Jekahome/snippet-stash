

File Cargo.toml:
```toml
[workspace]

members = [
    "adder",
    "add_one",
]
```
 
File add_one/src/lib.rs:
<pre><code class="language-rust">
use rand;
pub fn add_one(x: i32) -> i32 {
    x + 1
}
// $ cargo test -p add_one
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(add_one(2), 3);
    }
}
</code></pre>

File add_one/Cargo.toml:
```toml
[package]
name = "add_one"
version = "0.1.0"
edition = "2021"
 
[dependencies]
rand = "0.8.5"
```

 
File adder/src/main.rs:
<pre><code class="language-rust">
use rand;
use add_one;

// $ cargo run -p adder
fn main() {
    let num = 10;
    println!("Hello, world! {num} plus one is {}!", add_one::add_one(num));
}
</code></pre>

File adder/Cargo.toml:
```toml
[package]
name = "adder"
version = "0.1.0"
edition = "2021"
 
[dependencies]
rand = "0.8.5"
add_one = { path = "../add_one" }
```

Запуск:
```
$ cargo test -p add_one

$ cargo run -p adder
```





