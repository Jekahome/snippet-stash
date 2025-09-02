

<pre><code class="language-rust">
use itertools::Itertools;
fn main(){
    assert!(itertools::all(&[1, 2, 3], |elt| *elt > 0));
}
</code></pre>
