


<pre><code class="language-rust">
fn main(){
 //  insert вставка по индексу, смещает все индексы больше вставленного
    use std::collections::VecDeque;

    let mut vec_deque = VecDeque::new();
    vec_deque.push_back('a');
    vec_deque.push_back('b');
    vec_deque.push_back('c');
    assert_eq!(vec_deque, &['a', 'b', 'c']);

    vec_deque.insert(1, 'd');
    assert_eq!(vec_deque, &['a', 'd', 'b', 'c']);
}
</code></pre>
