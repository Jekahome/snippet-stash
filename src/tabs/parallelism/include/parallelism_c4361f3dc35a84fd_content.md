


<pre><code class="language-rust">
use std::thread;
use std::thread::JoinHandle;
fn main() -> std::io::Result<()>{
    let handler:JoinHandle<i32> = thread::spawn(move || {
        thread::sleep(std::time::Duration::from_millis(1));
        println!("ID:{:?}",thread::current().id());
        1
    });
    let join:Result<i32,Box<dyn std::any::Any + Send>> = handler.join();
    assert_eq!(1,join.unwrap());

    let count = thread::available_parallelism()?.get();
    println!("ID:{:?}",thread::current().id());
    println!("степень параллелизма по умолчанию:{count}");// 12
    Ok(())
}
</code></pre>
