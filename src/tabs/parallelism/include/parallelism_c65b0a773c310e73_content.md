


<pre><code class="language-rust">
fn check<I>(iter: I)
    where I: ParallelIterator + Clone,
          I::Item: std::fmt::Debug + PartialEq
{
    let a: Vec<_> = iter.clone().collect();
    let b: Vec<_> = iter.collect();
    assert_eq!(a, b);
}
</code></pre>

---

<pre><code class="language-rust">
fn check<I>(iter: I)
    where I: ParallelIterator + Debug
{
    println!("{:?}", iter);
}
</code></pre>

---

<pre><code class="language-rust">
use std::collections::HashMap;
fn main(){
    let mut map: HashMap<_,_> = (0..10).enumerate().collect();
    check(map.par_iter());
    check(map.par_iter_mut());
    check(map.into_par_iter());
}
</code></pre>

---

<pre><code class="language-rust">
use std::collections::BTreeMap;
fn main(){
    let mut map: BTreeMap<_,_> = (0..10).enumerate().collect();
    check(map.par_iter());
    check(map.par_iter_mut());
    check(map.into_par_iter());
}
</code></pre>

---

<pre><code class="language-rust">
use std::collections::VecDeque;
fn main(){
    let deque: VecDeque<_> = (0..1000).collect();
    check(deque.par_iter());
    check(deque.into_par_iter());
}
</code></pre>

---

К методам строк добавляется приставка par_
<pre><code class="language-rust">
fn main(){
    let s = String::from("hello")
    check(s.par_chars());
    check(s.par_lines());
    check(s.par_split('\n'));
    check(s.par_split_terminator('\n'));
    check(s.par_split_whitespace());

   let par_even: String = s.par_chars().filter(|&c| (c as u32) & 1 == 0).collect();
}
</code></pre>
