

<pre><code class="language-rust">
fn main(){
    fn is_even(n: &i32) -> bool {
            n % 2 == 0
    }
    assert_eq!(None.filter(is_even), None);
    assert_eq!(Some(3).filter(is_even), None);
    assert_eq!(Some(4).filter(is_even), Some(4));
}
</code></pre>

---

Использование identity для сохранения Some вариантов итератора `Option<T>`
<pre><code class="language-rust">
use std::convert::identity;
fn main(){
    let iter = vec![Some(1), None, Some(3)].into_iter();
    let filtered = iter.filter_map(identity).collect::<Vec<_>>();
    assert_eq!(vec![1, 3], filtered);
}
</code></pre>
