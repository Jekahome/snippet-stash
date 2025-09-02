


<pre><code class="language-rust">
use std::backtrace::Backtrace;
 
fn main() {
    std::env::set_var("RUST_BACKTRACE", "Hi I'm backtraceㅎㅎㅎ");
    println!("{}", Backtrace::capture());
}
</code></pre>

---

<pre><code class="language-rust">
use std::{
    backtrace::{Backtrace, BacktraceStatus::*},
    panic,
};
 
fn main() {
    panic::set_hook(Box::new(|_| {
        println!("Panicked! Trying to get a backtrace...");
        let backtrace = Backtrace::capture();                            
        match backtrace.status() {                                       
            Disabled => println!("Backtrace isn't enabled, sorry"),
            Captured => println!("Here's the backtrace!!\n{backtrace}"),
            Unsupported => println!("No backtrace possible, sorry"),     
            // Do some database shutting down stuff 
        }
    }));
 
    std::env::set_var("RUST_BACKTRACE", "0");                            
    panic!();
}
</code></pre>
