


<pre><code class="language-rust">
use std::thread::park_timeout;
use std::time::{Instant, Duration};
let timeout = Duration::from_secs(2);
let beginning_park = Instant::now();
let mut timeout_remaining = timeout;
loop {
    park_timeout(timeout_remaining);
    let elapsed = beginning_park.elapsed();
    if elapsed >= timeout {
        break;
    }
    println!("restarting park_timeout after {:?}", elapsed);
    timeout_remaining = timeout - elapsed;
}
</code></pre>
