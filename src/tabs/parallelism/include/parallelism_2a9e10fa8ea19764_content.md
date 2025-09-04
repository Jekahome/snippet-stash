


<pre><code class="language-rust">
fn main(){
    extern crate rayon; use rayon::prelude::*;
    let mut v_par = vec![-5, 4, 1, -3, 2];
    let now = Instant::now();
    v_par.par_sort_unstable();
    println!("{:?}", now.elapsed());  assert_eq!(v_par[..], [-5, -3, 1, 2, 4]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [5, 4, 1, 3, 2];
    v.par_sort_unstable_by(|a, b| a.cmp(b));
    assert_eq!(v, [1, 2, 3, 4, 5]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [-5i32, 4, 1, -3, 2];
    v.par_sort_unstable_by_key(|k| k.abs());
    assert_eq!(v, [1, 2, -3, 4, -5]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [5, 4, 1, 3, 2];
    v.par_sort_by(|a, b| a.cmp(b));
    assert_eq!(v, [1, 2, 3, 4, 5]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [-5i32, 4, 1, -3, 2];
    v.par_sort_by_key(|k| k.abs());
    assert_eq!(v, [1, 2, -3, 4, -5]);
}
</code></pre>

---

Возвращает параллельный итератор по большей части chunk_size элементов за  self раз. Куски изменяемы и не перекрываются.
<pre><code class="language-rust">
fn main(){
    let mut array = [1, 2, 3, 4, 5,6];
    array.par_chunks_mut(3).for_each(|slice| { println!("{:?}",slice); slice.reverse()});
    println!("{:?}",array);
    [1, 2, 3]  [4, 5, 6]  [3, 2, 1, 6, 5, 4]
}
</code></pre>

---

Возвращает параллельный итератор над изменяемыми подклассами, разделенными элементами, которые соответствуют разделителю. В данном случае разделитель 0
<pre><code class="language-rust">
fn main(){

    let mut array = [1, 2, 3, 0, 2, 4, 8, 0, 3, 6, 9];
    array.par_split_mut(|i| *i == 0)
        .for_each(|slice| slice.reverse());
    assert_eq!(array, [3, 2, 1, 0, 8, 4, 2, 0, 9, 6, 3]);
}
</code></pre>

---

`as_parallel_slice_mut(&mut self) -> &mut [T]` -  Возвращает простой измененный фрагмент, который используется для реализации остальных параллельных методов.
<pre><code class="language-rust">
fn main(){
    let mut array = vec![1, 2, 3, 4, 5,6];
    assert_eq!(array.as_parallel_slice_mut(), [1, 2, 3, 4, 5,6]);
    println!("{:?}", array.as_parallel_slice_mut());
}
</code></pre>








