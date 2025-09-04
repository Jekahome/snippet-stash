

Просто вернуть значение из потока Joinhandle
<pre><code class="language-rust">
use std::collections::HashMap;
use std::thread;
pub fn frequency(input: &[&str], worker_count: usize) -> HashMap<char, usize> {
    let mut result: HashMap<char, usize> = HashMap::new();
    let chunks = input.chunks((input.len() / worker_count).max(1));
    let mut handles = Vec::new();

    for chunk in chunks {
        let string = chunk.join("");
        // return a HashMap from each thread, the JoinHandle wraps this hashmap
        let handle = thread::spawn(move || {
            let mut map: HashMap<char, usize> = HashMap::new();
            for c in string.chars().filter(|c| c.is_alphabetic()) {
                *map.entry(c.to_ascii_lowercase()).or_default() += 1;
            }
            map
        });
        handles.push(handle);
    }
    for handle in handles {
        let map = handle.join().unwrap();
        for (key, value) in map {
            *result.entry(key).or_default() += value;
        }
    }
    result
}
fn main() {
   let content:&str = "abcafdabc";
   let v: Vec<&str>   = content.split("").filter(|s|s.len()>0).collect();// ["a","b"]
   println!("{:#?}", frequency(&v[..],3));
}
</code></pre>
