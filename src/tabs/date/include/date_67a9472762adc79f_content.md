


<pre><code class="language-rust">
use chrono::{Local, DateTime};

struct Logger;

impl Logger {
    fn log(&self, level: &str, message: &str) {
        let timestamp: DateTime<Local> = Local::now();
        println!("[{}] {}: {}", timestamp.format("%Y-%m-%d %H:%M:%S"), level, message);
    }
    
    fn error(&self, message: &str) {
        self.log("ERROR", message);
    }
    
    fn info(&self, message: &str) {
        self.log("INFO", message);
    }
}
fn main(){
 ...
}
</code></pre>
