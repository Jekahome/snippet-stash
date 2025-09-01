


<pre><code class="language-rust">
fn main(){
    let c = r"foo\bar";
    let d = concat!(r"foo\", r"bar");
    assert_eq!(c, d);
// ---------------------------------------------
// Из Vec можно склеить строку
    let bits = vec!["veni", "vidi", "vici"];
    assert_eq!(bits.concat(), "venividivici");
    assert_eq!(bits.join(", "), "veni, vidi, vici");
}
</code></pre>
