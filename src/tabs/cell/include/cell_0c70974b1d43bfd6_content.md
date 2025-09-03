


<pre><code class="language-rust">
fn main(){
    use std::cell::Cell;
    let c = Cell::new(5);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let c = Cell::new(5);
    c.set(10);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let c = Cell::new(5);
    let five:i32 = c.get();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut c = Cell::new(5);
    *c.get_mut() += 1;
    assert_eq!(c.get(), 6);

    let ref_cell:&mut i32 = c.get_mut();
    *ref_cell=5;
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let c = Cell::new(5);
    let ptr:*mut i32 = c.as_ptr();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let slice: &mut [i32] = &mut [1, 2, 3];
    let cell_slice: &Cell<[i32]> = Cell::from_mut(slice);
    let slice_cell: &[Cell<i32>] = cell_slice.as_slice_of_cells();
    assert_eq!(slice_cell.len(), 3);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let c1 = Cell::new(5i32);
    let c2 = Cell::new(10i32);
    c1.swap(&c2);
    assert_eq!(10, c1.get());
    assert_eq!(5, c2.get());
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let cell = Cell::new(5);
    assert_eq!(cell.get(), 5);
    assert_eq!(cell.replace(10), 5);
    assert_eq!(cell.get(), 10);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let c = Cell::new(5);
    let five = c.take();
    assert_eq!(five, 5);
    assert_eq!(c.into_inner(), 0);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let c = Cell::new(5);
    let five = c.into_inner();
    assert_eq!(five, 5);
}
</code></pre>

---

<pre><code class="language-rust">
#![feature(cell_update)]
fn main(){
    let c = Cell::new(5);
    let new = c.update(|x| x + 1);
    assert_eq!(new, 6);
    assert_eq!(c.get(), 6);
}
</code></pre>
