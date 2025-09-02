


<pre><code class="language-rust">
fn main(){
    let mut map: HashMap<i32, i32> = (0..8).map(|x|(x, x*10)).collect();
    map.retain(|&k, _| k % 2 == 0);
    assert_eq!(map.len(), 4);
}
</code></pre>
