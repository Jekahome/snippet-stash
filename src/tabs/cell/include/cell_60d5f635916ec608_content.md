


<pre><code class="language-rust">
use std::cell::RefCell;
use std::cell::Ref;

fn foo(ref_cell: &RefCell<u32>) {
    *ref_cell.borrow_mut()=4; //  ❌ panic!
}

fn main() {
    let ref_cell = RefCell::new(0);
    let ref_value:Ref<'_,u32> = ref_cell.borrow();// во время выполнения! при следующей попытке взять borrow_mut вызовет panic! 
    let value:u32 = *ref_cell.borrow() + 1;
    foo(&ref_cell);
    *ref_cell.borrow_mut()=value; //  ❌ panic!
    println!("{:?}",ref_cell);
}
</code></pre>

```
$ cargo build ✅
$ ./target/debug/main ❌ panic!
```
