

Через каналы mpsc::channel
<pre><code class="language-rust">
use std::collections::HashMap;
use std::mem;
use std::sync::mpsc;
use std::thread;
pub fn frequency(input: &[&str], worker_count: usize) -> HashMap<char, usize> {
    let mut result: HashMap<char, usize> = HashMap::new();
    let chunks = input.chunks((input.len() / worker_count).max(1));
    let (sender, receiver) = mpsc::channel();
    for chunk in chunks {
        let sender = sender.clone();
        let string = chunk.join("");
        thread::spawn(move || {
            // Solve each chunk and send the resulting HashMap down the channel
            let mut map: HashMap<char, usize> = HashMap::new();
            for c in string.chars().filter(|c| c.is_alphabetic()) {
                *map.entry(c.to_ascii_lowercase()).or_default() += 1;
            }
            sender.send(map).unwrap();
        });
    }
     // Если не удалить sender то receiver будет ждать, пока все senders не будут отброшены
    // исходный receiver никогда не отбрасывается, так что receiver ждет вечно
    // удалить оригинал sender, иначе канал останется открытым, заставляя получателя бесконечно ждать
    mem::drop(sender);
    // combine every received HashMap
    for received in receiver {
        for (key, value) in received {
            *result.entry(key).or_default() += value;
        }
    }
    result
}
</code></pre>
