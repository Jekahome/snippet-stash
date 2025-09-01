


<pre><code class="language-rust">
fn main(){
    assert_eq!((3..5), std::ops::Range { start: 3, end: 5 });// 3, 4
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let bounded: std::ops::Range<i32> = 0..10;
    for i in bounded{
        print!("{i}");
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let from = 0..;
    let to = ..10;
    let full = ..;
    let inclusive = 0..=9;
    for i in (0..10).step_by(2) {
        println!("i = {}", i);
    }
// Пo lo..hi и lo.. можно итерироваться
}
</code></pre>
