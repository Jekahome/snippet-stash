


<pre><code class="language-rust">
fn main(){
    let mut v:Vec<f32>=vec![1.0,4.0,3.0];
    //v.sort();// the trait `std::cmp::Ord` is not implemented for `f32`
    v.sort_by(|a,b|a.partial_cmp(b).unwrap()); если нет std::f64::NAN иначе ошибка
    println!("{:?}",v);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    #![feature(sort_floats)]
    let mut v = [2.6, -5e-8, f32::NAN, 8.29, f32::INFINITY, -1.0, 0.0, -f32::INFINITY, -0.0];
    v.sort_floats();
    let sorted = [-f32::INFINITY, -1.0, -5e-8, -0.0, 0.0, 2.6, 8.29, f32::INFINITY, f32::NAN];
    assert_eq!(&v[..8], &sorted[..8]);
    assert!(v[8].is_nan());
}
</code></pre>
