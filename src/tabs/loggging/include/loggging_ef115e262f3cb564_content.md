

Это обеспечит информативное логирование даже при панике.
<pre><code class="language-rust">
use log::set_hook;

fn main() {
    set_hook(Box::new(|panic_info| {
        error!("Application panicked: {}", panic_info);
    }));
    // ...
}
</code></pre>
