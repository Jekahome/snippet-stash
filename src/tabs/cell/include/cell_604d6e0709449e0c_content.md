

<pre><code class="language-rust">
fn main(){
    let ref_cell = RefCell::new(1);
    {
        let ref_value:RefMut<'_,u32> = ref_cell.borrow_mut(); 
        let mut ref_value_2: RefMut<'_, u32> = RefMut::map(ref_value,|v|{*v=*v+1; v});

        assert_eq!(2u32,*ref_value_2);
    }
    assert_eq!(*ref_cell.borrow(), 2u32);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let ref_cell = RefCell::new(1);
    {
        let ref_value:RefMut<'_,u32> = ref_cell.borrow_mut(); 
        let mut res_ref_value_2:Result<RefMut<'_, u32> ,_> = RefMut::filter_map(ref_value,|v|{*v=*v+1; Some(v)});

        assert_eq!(2u32,*(res_ref_value_2.unwrap()));
    }
    assert_eq!(*ref_cell.borrow(), 2u32);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    #![feature(cell_leak)]
    let ref_cell = RefCell::new(1);
    let ref_value:RefMut<'_,u32> = ref_cell.borrow_mut(); 
    let value:&mut u32 = RefMut::leak(ref_value);
    *value = 2;  
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    use std::cell::{RefCell, RefMut};

    let cell = RefCell::new([1, 2, 3, 4]);
    let borrow = cell.borrow_mut();
    let (mut begin, mut end) = RefMut::map_split(borrow, |slice| slice.split_at_mut(2));
    assert_eq!(*begin, [1, 2]);
    assert_eq!(*end, [3, 4]);
    begin.copy_from_slice(&[4, 3]);
    end.copy_from_slice(&[2, 1]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let ref_cell = RefCell::new(1);
    let ref_value:Ref<'_,u32> = ref_cell.borrow(); 
    let ref_value2:Ref<'_,u32> = Ref::clone(&ref_value);
}
</code></pre>
