


<pre><code class="language-rust">
fn main(){
    let five = Rc::new(5);
    let same_five = Rc::clone(&five);
    let other_five = Rc::new(5);

    assert!(Rc::ptr_eq(&five, &same_five));
    assert!(!Rc::ptr_eq(&five, &other_five));
}
</code></pre>
