


<pre><code class="language-rust">
fn main(){
    let c = RefCell::new(5);

    {
        let m = c.borrow();
        assert!(c.try_borrow_mut().is_err());
    }

    assert!(c.try_borrow_mut().is_ok());
}
</code></pre>
