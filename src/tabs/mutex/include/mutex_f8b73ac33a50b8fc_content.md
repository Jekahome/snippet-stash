

Если очередь пуста, поток будет "парковаться" с помощью **thread::park()**. Это значит, что поток приостановит свою работу до тех пор, пока кто-то не вызовет **thread::unpark()** на этом потоке.
<pre><code class="language-rust">


use std::collections::VecDeque;
fn main() {
    let queue = Mutex::new(VecDeque::new());

    thread::scope(|s| {
        // Consuming thread
        let t = s.spawn(|| loop {
            let item = queue.lock().unwrap().pop_front();
            if let Some(item) = item {
                dbg!(item);
            } else {
                thread::park(); // приостановка пока не будет вызван unpark даюший понять что данные появились
            }
        });

        // Producing thread
        for i in 0.. {
            queue.lock().unwrap().push_back(i);
            t.thread().unpark();
            thread::sleep(Duration::from_secs(1));
        }
    });
}
</code></pre>
