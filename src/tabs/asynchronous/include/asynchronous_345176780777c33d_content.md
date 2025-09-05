

```toml
[dependencies]
futures = "0.3"
tokio =  { version = "1.12", features = ["full"] }
```

<pre><code class="language-rust">
async fn app() {
    println!("Hello");
}
// Способ через tokio::runtime::Runtime
fn main() {
    let mut rt = tokio::runtime::Runtime::new().unwrap();
    let future = app();
    rt.block_on(future);
}
// Способ через  #[tokio::main]
#[tokio::main]
async fn main() {
    println!("Hello");
}
</code></pre>
