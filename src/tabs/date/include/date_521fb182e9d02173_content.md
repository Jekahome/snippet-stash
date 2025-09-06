

**Rate limiting**
<pre><code class="language-rust">
struct RateLimiter {
    last_request: SystemTime,
    min_interval: Duration,
}

impl RateLimiter {
    fn new(min_interval: Duration) -> Self {
        Self {
            last_request: SystemTime::UNIX_EPOCH, // Давно в прошлом
            min_interval,
        }
    }
    
    fn can_make_request(&mut self) -> bool {
        let now = SystemTime::now();
        if let Ok(elapsed) = now.duration_since(self.last_request) {
            if elapsed >= self.min_interval {
                self.last_request = now;
                return true;
            }
        }
        false
    }
}
fn main(){
 
}
</code></pre>

**Валидация временных меток**
<pre><code class="language-rust">
fn is_timestamp_valid(timestamp: u64, max_age: Duration) -> bool {
    let event_time = SystemTime::UNIX_EPOCH + Duration::from_secs(timestamp);
    let now = SystemTime::now();
    
    match now.duration_since(event_time) {
        Ok(age) => age <= max_age,
        Err(_) => false, // Время из будущего
    }
}
fn main(){
 ...
}
</code></pre>
