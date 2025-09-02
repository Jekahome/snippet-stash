


<pre><code class="language-rust">
fn main(){
 //  append дополняет очередь
    let mut buf: VecDeque<_> = vec![1, 2].into_iter().collect();
    let mut buf2: VecDeque<_> = vec![3, 4].into_iter().collect();
    buf.append(&mut buf2);
    assert_eq!(buf, [1, 2, 3, 4]);
    assert_eq!(buf2, []);
}
</code></pre>
