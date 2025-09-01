


<pre><code class="language-rust">
fn main(){
    let mut a:Vec<i32> = vec![1,2,3];
    let mut a:[i32;3] = [1,2,3];
    a.sort();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [-5, 4, 1, -3, 2];
    v.sort_unstable();
    assert!(v == [-5, -3, 1, 2, 4]);
        
    let mut v:Vec<&str> = vec!["-5", "4","2","-10"];
    v.sort_unstable();
    println!("{:?}",v);// ["-10", "-5", "2", "4"]
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [5, 4, 1, 3, 2];
    v.sort_unstable_by(|a, b| a.cmp(b));
    assert!(v == [1, 2, 3, 4, 5]);

    // reverse sorting
    v.sort_unstable_by(|a, b| b.cmp(a));
    assert!(v == [5, 4, 3, 2, 1]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [-5i32, 4, 1, -3, 2];
    v.sort_unstable_by_key(|k| k.abs());
    assert!(v == [1, 2, -3, 4, -5]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [-5i32, 4, 1, -3, 2];

    v.sort_by_key(|k| k.abs());
    assert!(v == [1, 2, -3, 4, -5]);
}
</code></pre>
