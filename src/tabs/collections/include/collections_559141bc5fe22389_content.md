

<pre><code class="language-rust">
fn main(){
// Изменчивый диапазон (от до не включая ) по значениям
    let mut map: BTreeMap<&str, i32> = ["Alice", "Bob", "Carol", "Cheryl"].iter()
        .map(|&s| (s, 0))
        .collect();

    for (name, balance) in map.range_mut("B".."Cheryl") {
        *balance += 100;
        println!("{} => {}", name, balance);
    }
}
</code></pre>
