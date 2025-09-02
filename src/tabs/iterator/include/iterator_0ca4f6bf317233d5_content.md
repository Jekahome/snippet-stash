


<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    let b: Vec<u32> = Vec::new();
    assert_eq!(a.iter().max(), Some(&3));
    assert_eq!(b.iter().max(), None
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    let b: Vec<u32> = Vec::new();
    assert_eq!(a.iter().min(), Some(&1));
    assert_eq!(b.iter().min(), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [-3_i32, 0, 1, 5, -10];
    assert_eq!(*a.iter().max_by_key(|x| x.abs()).unwrap(), -10);
    assert_eq!(*a.iter().max_by_key(|x| *x>&1).unwrap(), 5);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
   let a = [-3_i32, 0, 1, 5, -10];
    assert_eq!(*a.iter().max_by(|x, y| x.cmp(y)).unwrap(), 5);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [10, 20, 30,40,50];
    let iter = a.iter();
    assert_eq!((5, Some(5)), iter.size_hint())
//---------------------------------------------------------
    let iter = (0..10).filter(|x| x % 2 == 0).chain(15..20);

    // now both bounds are increased by five
    assert_eq!((5, Some(15)), iter.size_hint());
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [10, 20, 5, -23 ,21,0];
    let b: [u32; 0] = [];
    assert_eq!(a.iter().reduce(|a, b| {
            if a >= b { a } else { b }
    }), Some(&20));
        
    assert_eq!(b.iter().reduce(|a, b| {
            if a >= b { a } else { b }
    }), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    Безопасно вычислите сумму ряда чисел
    #![feature(iterator_try_reduce)]

    let numbers: Vec<usize> = vec![10, 20, 5, 23, 0];
    let sum = numbers.into_iter().try_reduce(|x, y| x.checked_add(y));
    assert_eq!(sum, Some(Some(58)));
}
</code></pre>
