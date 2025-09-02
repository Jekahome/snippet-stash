

<pre><code class="language-rust">
fn main(){
// Сохраняет только элементы, заданные предикатом. 
    let xs = [1,2,3,4,5,6];
    let mut set: HashSet<i32> = xs.iter().cloned().collect();
    set.retain(|&k| k % 2 == 0);
    assert_eq!(set.len(), 3);
}
</code></pre>
