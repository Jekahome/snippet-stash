


<pre><code class="language-rust">
use std::fs::OpenOptions;
fn main(){
    let file = OpenOptions::new()
        .create_new(true)
        .read(true)
        .write(true)
        .open("foo.txt");
}
</code></pre>
