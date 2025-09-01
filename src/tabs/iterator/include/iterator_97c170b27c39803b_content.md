


<pre><code class="language-rust">
fn main(){
    let a = [1, 2];
    let mut iter = a.iter().rev();
    assert_eq!(iter.next(), Some(&2));
    assert_eq!(iter.next(), Some(&1));
    assert_eq!(iter.next(), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [1, 2];
    let mut it = a.iter().cycle();

    assert_eq!(it.next(), Some(&1));
    assert_eq!(it.next(), Some(&2));
    assert_eq!(it.next(), Some(&1));
    assert_eq!(it.next(), Some(&2));
    assert_eq!(it.next(), Some(&1));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    let v_cloned: Vec<_> = a.iter().cloned().collect();
    // cloned is the same as .map(|&x| x), for integers
    let v_map: Vec<_> = a.iter().map(|&x| x).collect();

    assert_eq!(v_cloned, vec![1, 2, 3]);
    assert_eq!(v_map, vec![1, 2, 3]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    let v_copied: Vec<_> = a.iter().copied().collect();
    let v_map: Vec<_> = a.iter().map(|&x| x).collect();

    assert_eq!(v_copied, vec![1, 2, 3]);
    assert_eq!(v_map, vec![1, 2, 3]);
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3,4,5];
    let mut iter = a.into_iter();
    // take вырезал первых три элемента
    let sum: i32 = iter.by_ref().take(3).fold(0, |acc, i| acc + i );
    assert_eq!(sum, 6);
    // используем дальше итератор, при условии что он не дошел до конца
    for i in iter{
       print!("{}/",i);
    }
}
</code></pre>
