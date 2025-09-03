


<pre><code class="language-rust">
fn main(){
    let cell:RefCell<OnceCell<String>> = RefCell::new(OnceCell::new());
    cell.borrow_mut().set("hello".to_string()).unwrap();
    {
        let mut bind = cell.borrow_mut();
        let ref_mut:Option<&mut String> = bind.get_mut();
        (*ref_mut.unwrap()).push_str("..."); 
    }

    assert_eq!(cell.borrow().get(), Some(&"hello...".to_string()));
}
</code></pre>
