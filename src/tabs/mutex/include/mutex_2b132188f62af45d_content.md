


<pre><code class="language-rust">
let arc_mutex:Arc<Mutex<i32>> = Arc::new(Mutex::new(0));
let mut handles:Vec<JoinHandle<()>> = Vec::new();
for id in 1..=10 {
    let mutex_clone:Arc<Mutex<i32>> = Arc::clone(&arc_mutex);
    let handle = thread::Builder::new()
    .name(format!("{}",id)).spawn(move || {
        // lock ожидет получения блокировки т.е. блокирует текуший поток до получения возможности заблокировать Mutex
        let mut guard: MutexGuard<'_,i32> = mutex_clone.lock().unwrap();
        *guard += 1;

        let result = std::panic::catch_unwind(||
            if *guard == 7{
                panic!("Aaaaa");
            }
         ).map_err(|e|{
            println!("PANICKED thread:{:?}",thread::current().name())
        }); 
        println!("+++ thread:{:?}",thread::current().name());
    }).unwrap();
    handles.push(handle);
}
</code></pre>
