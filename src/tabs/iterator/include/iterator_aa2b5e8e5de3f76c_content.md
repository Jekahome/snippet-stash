


<pre><code class="language-rust">
#![feature(iterator_try_collect)]
fn main(){
    let mut iter = [Some(1), Some(2), None, Some(3), Some(4)].into_iter();
    let v = iter.try_collect::<Vec<i32>>();
    assert_eq!(v, None);
    let v = iter.try_collect::<Vec<i32>>();
    assert_eq!(v, Some(vec![3, 4]));
}
</code></pre>
