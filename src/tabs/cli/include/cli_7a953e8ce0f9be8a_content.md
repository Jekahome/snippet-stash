

Файл Cargo.toml:
```toml
[dependencies]
envy = "0.3.2"
serde = "1.0"
serde_derive  = "1.0"
dotenv = "0.13.0"
dotenv_codegen = "0.11.0"
```

<pre><code class="language-rust">
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::from_filename(std::path::Path::new("authentication_jwt/.env")).ok();
    let DB = dotenv::var("DB").unwrap();
}
</code></pre>
