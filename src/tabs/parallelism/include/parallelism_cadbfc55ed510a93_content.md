


<pre><code class="language-rust">
use std::thread;
use std::thread::JoinHandle;
fn main() {
    let handler:JoinHandle<()> = thread::spawn(move || {
        println!("ID:{:?}",thread::current().id());
    });
}
</code></pre>
