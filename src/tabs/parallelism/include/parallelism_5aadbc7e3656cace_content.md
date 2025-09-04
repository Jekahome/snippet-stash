


<pre><code class="language-rust">
use std::thread;
use std::thread::JoinHandle;
fn main() {
    let handler:JoinHandle<i32> = thread::Builder::new()
        .name("thread1".into())
        .stack_size(2000000) // Размер стека по умолчанию 2 MB
        .spawn(move || {
            let thread:thread::Thread = thread::current();
            assert_eq!(thread.name(), Some("thread1"));
            println!("ID:{:?}",thread.id());
            1_i32
    }).unwrap();
   let res:i32 = handler.join().unwrap();
}
</code></pre>
