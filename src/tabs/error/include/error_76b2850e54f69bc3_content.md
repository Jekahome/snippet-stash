


<pre><code class="language-rust">
fn main(){
    let x = Some((1, "hi"));
    assert_eq!(x.unzip(), (Some(1), Some("hi")));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = Some("air"); // let x: Option<&str> = None;
    assert_eq!(x.unwrap(), "air");
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = Some("value");
    assert_eq!(x.expect("the world is ending"), "value");
    // let x: Option<&str> = None; x.expect("the world is ending");
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    assert_eq!(Some("car").unwrap_or("bike"), "car");
    assert_eq!(None.unwrap_or("bike"), "bike");
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let k = 10;
    assert_eq!(Some(4).unwrap_or_else(|| 2 * k), 4);
    assert_eq!(None.unwrap_or_else(|| 2 * k), 20);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let bad_year_from_input = "190blarg"; 
    let bad_year = bad_year_from_input.parse().ok().unwrap_or_default();
    assert_eq!(0, bad_year);
}
</code></pre>
