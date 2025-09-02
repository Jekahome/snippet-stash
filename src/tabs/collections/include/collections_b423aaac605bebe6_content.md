


<pre><code class="language-rust">
fn main(){
 //  remove удаляет по индексу и возвращает элемент смещая оставшиеся элементы 
    use std::collections::VecDeque;
    let mut buf = VecDeque::new();
    buf.push_back(1);
    buf.push_back(2);
    buf.push_back(3);
    assert_eq!(buf, [1, 2, 3]);

    assert_eq!(buf.remove(1), Some(2));
    assert_eq!(buf, [1, 3]);
}
</code></pre>
