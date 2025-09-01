


<pre><code class="language-rust">
fn filter_one(input: &[u8]) -> impl Iterator<Item = &u8> {
    input.iter().filter(|&&x| x == 1)
}

fn main() {
    let nums = vec![1, 2, 3, 1, 2, 3];
    let other: Vec<_> = filter_one(&nums).collect();
    println!("{:?}", other);
}
</code></pre>
