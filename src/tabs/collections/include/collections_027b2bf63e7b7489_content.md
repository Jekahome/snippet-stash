


<pre><code class="language-rust">
fn main(){
// Возвращает пару срезов front и back
 let mut vector = VecDeque::new();
    vector.push_back(0);
    vector.push_back(1);
    vector.push_front(10);
    vector.push_back(9);
    vector.push_front(8);
    // ([0, 1, 10, 9, 8], []) если все вставлены в конец
    println!("{:?}",vector.as_mut_slices());// ([8, 10], [0, 1, 9])
}
</code></pre>
