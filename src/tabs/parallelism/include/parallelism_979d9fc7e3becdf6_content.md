


<pre><code class="language-rust">
fn main(){
    let mut v = vec![0usize; 5];
    v.par_iter_mut().enumerate().for_each(|(i, x)| *x = i);
    assert_eq!(v, [0, 1, 2, 3, 4]);
}
</code></pre>

---

```
 (0..10).into_par_iter()
```
