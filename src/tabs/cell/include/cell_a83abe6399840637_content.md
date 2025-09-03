

<pre><code class="language-rust">
fn main(){
    let mut c = RefCell::new(5);
    *c.get_mut() += 1;
    assert_eq!(c, RefCell::new(6));
}
</code></pre>
