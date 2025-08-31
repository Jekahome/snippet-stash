

```toml
[dependencies]
lazy_static = "1.2.0"
```

<pre><code class="language-rust">
#[macro_use]
extern crate lazy_static; 
 lazy_static! {
    static ref REGEX_EMAIL: Regex = Regex::new(".+@.+").unwrap();
}  //  компилируется один раз при запуске программы

fn is_email(email: &str) -> bool {
    REGEX_EMAIL.is_match(email)
}
</code></pre>
