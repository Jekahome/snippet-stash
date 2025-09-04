


<pre><code class="language-rust">
use std::sync::Arc;
use std::sync::RwLock;
use std::thread;
fn main() {
    let rw_data = Arc::new(RwLock::new(Vec::<i32>::new()));
    let shared_data = Arc::clone(&rw_data);
    let shared_data2 = Arc::clone(&rw_data);

    let reader_thread = thread::spawn(move || {
        for _ in 0..5{
            if let Ok(ref shared_data_reader) = shared_data.try_read(){
                println!("Reader Thread: {:?}", *shared_data_reader);
            }    
            std::thread::sleep(std::time::Duration::from_millis(1));        
        }
    });

    let writer_thread = thread::spawn(move || {
        if let Ok(mut shared_data_writer) = shared_data2.try_write() {
            (*shared_data_writer).push(42);
            println!("Writer Thread {:?}", shared_data_writer);
        } else {
            println!("Couldn't get write access, sorry!")
        };
    });

    reader_thread.join().expect("Reader thread panicked");
    writer_thread.join().expect("Writer thread panicked");

    let final_data = rw_data.read().unwrap();
    println!("Final Data: {:?}", *final_data);
}
</code></pre>
