


<pre><code class="language-rust">
use std::iter;
fn main(){
    // это мог бы быть итератор по i32, но увы, это не так.
    let mut nope = iter::empty::<i32>();
    assert_eq!(None, nope.next());
}
</code></pre>
