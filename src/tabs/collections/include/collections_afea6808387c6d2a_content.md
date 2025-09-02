

<pre><code class="language-rust">
fn main(){
// Доступ по индексу
    let mut buf = VecDeque::new();
    buf.push_back(3);
    buf.push_back(4);
    buf.push_back(5);
    assert_eq!(buf.get(1), Some(&4));
}
</code></pre>
