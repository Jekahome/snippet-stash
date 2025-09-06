

```toml
log = "0.4"
env_logger = "0.9" 
```

<pre><code class="language-rust">
fn main(){
   let start = std::time::Instant::now();
    env_logger::Builder::from_default_env().format(move |buf, rec| {
        let t = start.elapsed().as_secs_f32();
        writeln!(buf, "{:.03} [{}] - {}", t, rec.level(),rec.args())
    }).init();
}
</code></pre>
