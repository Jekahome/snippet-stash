

<pre><code class="language-rust no_run edition2024">
fn foo(path: &std::path::Path) -> std::result::Result<(), Box<dyn std::error::Error>> {
    Err(Box::new( std::io::Error::new(std::io::ErrorKind::Other, "oh no!"))
} 
</code></pre>
