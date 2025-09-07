

<pre><code class="language-rust">
use std::fs::OpenOptions;
fn main(){
    let file = OpenOptions::new()
        .append(true)
        .write(true)
        .create(false)
        .open("foo.txt");
}
</code></pre>
