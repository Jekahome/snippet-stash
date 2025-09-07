


<pre><code class="language-rust">
use std::sync::{Mutex, RwLock};

#[macro_use]
extern crate bma_benchmark;

#[benchmark_stage(i=10_000_000)]
fn benchmark_mutex(mutex: Mutex<u64>) {
    let _a = mutex.lock().unwrap();
}

#[benchmark_stage(i=10_000_000,name="rwlock-read")]
fn benchmark_rwlock(rwlock: RwLock<u64>) {
    let _a = rwlock.read().unwrap();
}
fn main(){
    let mutex = Mutex::new(0);
    let rwlock = RwLock::new(0);
    benchmark_mutex(mutex);
    benchmark_rwlock(rwlock);
    staged_benchmark_print_for!("rwlock-read");
}
</code></pre>
